// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mini-crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

module.exports = app;
