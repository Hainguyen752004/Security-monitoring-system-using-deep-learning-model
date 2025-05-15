require('dotenv').config();
const cors1 = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

// Routers
var authRouter = require('./routes/auth');

var app = express();

// Configure CORS
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors1());


// Routes
app.use('/api/auth', authRouter);

// Catch 404
app.use(function(req, res, next) {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;