const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.get('/', (req,res) => {
   res.send('Backend Chatbot')
})

app.post('api/chat', (req,res) => {
    const {message} = req.body
    console.log("Message: ",message)
    //replace later on
    const reply = `You Said: ${message}`
    res.json({
        reply
    })
})



app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})