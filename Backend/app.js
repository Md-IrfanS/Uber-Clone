
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./db/db');
const authRoutes = require('./routes/user.routes');
const logger = require('./middlewares/logger');
const morgan = require('morgan');

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.send('Hello World!');
});

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Middleware files
// app.use(logger);

app.use('/api/v1/auth', authRoutes);

module.exports = app;