const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";
const SERPAPI_KEY = process.env.SERPAPI_KEY || ''
const BING_KEY = process.env.BING_KEY || ''
const BING_ENDPOINT = process.env.BING_ENDPOINT || ''

function estimateConfidence(reply) {
    const normalized = reply.toLowerCase();
    const uncertaintyWords = [
        "i don't know",
        "i do not know",
        "not sure",
        "uncertain",
        "cannot determine",
        "can't determine",
        "may be",
        "might be",
        "possibly",
        "probably",
        "as an ai"
    ];

    if (uncertaintyWords.some((word) => normalized.includes(word))) {
        return "low";
    }

    if (reply.length < 80 || normalized.includes("it depends")) {
        return "medium";
    }

    return "high";
}

async function webSearch(query) {
    // Returns array of {title, link, snippet}
    try {
        if (SERPAPI_KEY) {
            const res = await axios.get('https://serpapi.com/search.json', {
                params: {
                    q: query,
                    api_key: SERPAPI_KEY,
                    num: 3
                },
                timeout: 10000
            })
            const data = res.data || {}
            const items = []
            const results = data.organic_results || data.organic || []
            for (const r of results.slice(0,3)) {
                items.push({ title: r.title || r.position || '', link: r.link || r.url || '', snippet: r.snippet || r.snippet_text || '' })
            }
            return items
        }

        if (BING_KEY && BING_ENDPOINT) {
            const res = await axios.get(`${BING_ENDPOINT}/bing/v7.0/search`, {
                params: { q: query, count: 3 },
                headers: { 'Ocp-Apim-Subscription-Key': BING_KEY },
                timeout: 10000
            })
            const data = res.data || {}
            const items = []
            const web = (data.webPages && data.webPages.value) || []
            for (const w of web.slice(0,3)) {
                items.push({ title: w.name || '', link: w.url || '', snippet: w.snippet || '' })
            }
            return items
        }

        return []
    } catch (e) {
        console.warn('webSearch failed', e.message)
        return []
    }
}

function computeSearchAgreement(reply, sources) {
    if (!reply || !sources || sources.length === 0) return false
    const words = (reply || '').toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>4)
    const wordSet = new Set(words)
    for (const s of sources) {
        const text = (s.title || '') + ' ' + (s.snippet || '')
        const sWords = text.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>4)
        let common = 0
        for (const w of sWords) if (wordSet.has(w)) common++
        if (common >= 4) return true
    }
    return false
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        model: OLLAMA_MODEL
    });
});

app.post("/api/chat", async (req, res) => {

    const userMessage = req.body?.message?.trim();

    if (!userMessage) {
        return res.status(400).json({
            error: "Message is required"
        });
    }

    try {

        // Call AI and web search in sequence: AI reply first, then enrich with sources if possible
        const response = await axios.post(
            `${OLLAMA_URL}/api/generate`,
            {
                model: OLLAMA_MODEL,
                prompt: userMessage,
                stream: false
            },
            {
                timeout: 120000
            }
        );

        const reply = response.data?.response?.trim();

        if (!reply) {
            return res.status(502).json({
                error: "AI returned an empty response"
            });
        }

        // Try to fetch sources (if API key configured)
        const sources = await webSearch(userMessage)

        // Base confidence from heuristic
        let conf = estimateConfidence(reply)

        // If search agrees with reply, bump confidence one level
        if (sources && sources.length > 0) {
            const agrees = computeSearchAgreement(reply, sources)
            if (agrees) {
                if (conf === 'low') conf = 'medium'
                else if (conf === 'medium') conf = 'high'
            }
        }

        res.json({
            reply,
            confidence: conf,
            sources
        });

    } catch(error) {

        console.error("Ollama request failed:", error.message);

        res.json({
            reply: "I could not reach the local AI model yet. Make sure Ollama is running with the configured model, then ask again for a full answer.",
            confidence: "low"
        });

    }

});


app.listen(PORT, () => {
    console.log(`AI server running on port ${PORT}`);
    console.log(`Using Ollama model ${OLLAMA_MODEL} at ${OLLAMA_URL}`);
});
