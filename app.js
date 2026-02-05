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

// Mood route
app.get('/mood', async (req, res) => {
    const { emotion } = req.query;
    const url = `https://waifu.it/api/v4/${emotion}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: process.env.WAIFU_TOKEN
            }
        });
        res.json(data);
        console.log(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Quote route
app.get('/quotes', async (req, res) => {
    const url = "https://waifu.it/api/v4/quote";

    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: process.env.WAIFU_TOKEN
            }
        });
        res.json(data);
        console.log(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/waifu',async (req,res)=>{
const url = "https://waifu.it/api/v4/waifu";
try {
    const {data}= await axios.get(url, {
    headers:{
        Authorization: process.env.WAIFU_TOKEN
    }
    });
    res.json(data);
    console.log(data);
}catch(err)
{
    res.status(500).json({error: err.message});
}
});


app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
