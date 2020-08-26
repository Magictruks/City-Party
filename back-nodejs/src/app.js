const express = require('express');
const bodyParser = require('body-parser');
const router = require('../router');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(router);

module.exports = app;