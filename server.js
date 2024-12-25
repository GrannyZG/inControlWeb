const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Ruta za spremanje JSON-a
app.post('/save', (req, res) => {
    const data = req.body;
    fs.writeFile('positive_statements.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving JSON:', err);
            res.status(500).send('Failed to save data.');
        } else {
            res.send('Data saved successfully!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
