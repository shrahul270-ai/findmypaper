const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from the root directory
app.use(express.static(path.join(__dirname, '/')));

// --- API ROUTES (Mock Backend) ---

// In-memory mock data (this would eventually be a DB like MongoDB or PostgreSQL)
let db = {
  agents: [],
  hawkers: [],
  customers: []
};

// GET endpoints
app.get('/api/agents', (req, res) => {
  res.json(db.agents);
});

// POST endpoints
app.post('/api/agents', (req, res) => {
  const newAgent = req.body;
  if (!newAgent.id) {
    newAgent.id = 'AGT-' + Date.now(); // fallback ID generation
  }
  db.agents.unshift(newAgent);
  res.status(201).json({ message: 'Agent created successfully', agent: newAgent });
});

// Fallback for SPA routing (if we were using React/Vue, this routes everything to index.html)
// Since we have a multi-screen static app, we'll just serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 PaperFlow ERP Backend Server Running!`);
  console.log(`🔗 Local Access: http://localhost:${PORT}`);
  console.log(`===========================================`);
});
