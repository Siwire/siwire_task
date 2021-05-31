const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.use('/', express.static('public'));

app.get('/currencies', async (req, res) => {
    const response = await axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0');
    return res.send({ data: response.data });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});