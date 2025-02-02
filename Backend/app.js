
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./db/db');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

connectDB();

app.use(cors());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

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
app.use('/api/v1/captains', captainRoutes);

module.exports = app;