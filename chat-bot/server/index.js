const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/chat", async (req, res) => {

    const userMessage = req.body.message;

    try {

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3.1:8b",
                prompt: userMessage,
                stream: false
            }
        );


        res.json({
            reply: response.data.response
        });

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "AI unavailable"
        });

    }

});


app.listen(3000, () => {
    console.log("AI server running on port 3000");
});