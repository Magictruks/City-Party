const express = require('express');
const app = express();
const cors = require('cors');

const categoryRoutes = require('./src/routes/category');
const eventRoutes = require('./src/routes/event');
const userRoutes = require('./src/routes/user');
const authRoutes = require('./src/routes/auth');

app.use(cors({origin: `*` , credentials :  true}));

app.use('/api/category', cors(), categoryRoutes);
app.use('/api/event', cors(), eventRoutes);
app.use('/api/user', cors(), userRoutes);
app.use('/', cors(), authRoutes);

module.exports = app;