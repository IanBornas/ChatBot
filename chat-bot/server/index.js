const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";

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

        res.json({
            reply,
            confidence: estimateConfidence(reply)
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
