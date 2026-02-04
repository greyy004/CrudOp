import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public/html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'characters.html'));
});

// Route to fetch Waifu.it API
app.get('/goto', async (req, res) => {
    const url = "https://waifu.it/api/v4/happy"; // specify endpoint and version
    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: process.env.WAIFU_TOKEN // store token in .env
            }
        });
        console.log(data);
        res.json(data); // send JSON to client
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
