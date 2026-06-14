const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";

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
            reply
        });

    } catch(error) {

        console.error("Ollama request failed:", error.message);

        res.status(500).json({
            error: "AI unavailable. Make sure Ollama is running and the model is installed."
        });

    }

});


app.listen(PORT, () => {
    console.log(`AI server running on port ${PORT}`);
    console.log(`Using Ollama model ${OLLAMA_MODEL} at ${OLLAMA_URL}`);
});
