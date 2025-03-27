require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const wsPort = 9001;

app.use(cors());
app.use(express.json());

// Serve static files with proper MIME types
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/analyze-error', async (req, res) => {
    try {
        const { error } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a Smalltalk expert helping a beginner understand their code errors. Provide clear, concise explanations and suggestions for fixes."
                },
                {
                    role: "user",
                    content: `I got this error in Smalltalk: ${error}`
                }
            ],
        });

        res.json({ explanation: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set up WebSocket server with error handling
const wss = new WebSocket.Server({ 
    port: wsPort,
    perMessageDeflate: false // Disable compression for Squeak compatibility
});

wss.on('error', function(error) {
    console.error('WebSocket Server Error:', error);
});

wss.on('connection', function(ws) {
    console.log('New WebSocket connection established');
    
    ws.on('message', function(message) {
        console.log('Received message:', message);
        try {
            // Echo the message back
            ws.send(message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
    
    ws.on('error', function(error) {
        console.error('WebSocket connection error:', error);
    });
    
    ws.on('close', function() {
        console.log('Client disconnected');
    });
});

// Start HTTP server
const server = app.listen(port, () => {
    console.log(`HTTP Server running at http://localhost:${port}`);
    console.log(`WebSocket Server running at ws://localhost:${wsPort}`);
});
