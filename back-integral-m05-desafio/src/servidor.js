const rota = require('./rotas');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
app.use(rota)


module.exports = app;