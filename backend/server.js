const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// สร้าง logs folder ถ้าไม่มี
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// API Demo Endpoint
app.get('/api/demo', (req, res) => {
    // Write log
    const logMessage = `Request at ${new Date().toISOString()}: ${req.ip}\n`;
    fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

    res.json({
        git: { title: 'Midterm Git', detail: 'Branching and Committing' },
        docker: { title: 'Midterm Docker', detail: 'Containerization' }
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});