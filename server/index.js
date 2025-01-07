const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors({
    origin: 'https://arch-insights.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.options('*', cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

app.post('/api/langflow', async (req, res) => {
    console.log('Received request to /api/langflow');
    const { flowId, langflowId, body } = req.body;
    const applicationToken = process.env.VITE_LANGFLOW_TOKEN;
    
    if (!flowId || !langflowId || !body) {
        console.error('Missing required parameters:', { flowId, langflowId, body: !!body });
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    console.log('Processing request with:', {
        flowId,
        langflowId,
        applicationToken: applicationToken ? 'present' : 'missing',
        body: body
    });
    
    try {
        const url = `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowId}?stream=false`;
        console.log('Making request to:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${applicationToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        console.log('Langflow API Response Status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error from Langflow API:', errorData);
            return res.status(response.status).json({ error: errorData });
        }

        const responseData = await response.json();
        console.log('Successfully received response from Langflow API');
        res.json(responseData);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch from Langflow API',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
    console.log('Environment variables loaded:', {
        LANGFLOW_TOKEN: process.env.VITE_LANGFLOW_TOKEN ? 'present' : 'missing'
    });
});
