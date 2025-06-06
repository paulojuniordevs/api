const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let lastPing = null;

app.post('/saudade', (req, res) => {
    const { nome } = req.body;
    lastPing = { nome, timestamp: Date.now() };
    console.log(`${nome} está com saudade!`);
    res.status(200).send({ message: 'Saudade enviada com sucesso!' });
});

app.get('/saudade', (req, res) => {
    if (lastPing) {
        res.send(lastPing);
        lastPing = null; // consome a saudade
    } else {
        res.status(204).send(); // sem conteúdo novo
    }
});

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
