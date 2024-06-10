// server/controllers/orderController.js

// server/controllers/orderController.js
const Order = require('../models/Order'); // Import the Order model
const Customer = require('../models/Customer');
const { ObjectId } = require('mongoose').Types; // Import ObjectId from Mongoose

// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types; // Import ObjectId from Mongoose

exports.createOrder = async (req, res) => {
    const { customerId, amount } = req.body;
    if (!customerId || !amount) {
        return res.status(400).json({ error: 'Customer ID and Amount are required' });
    }

    try {
        // Create ObjectId using new keyword
        const customerIdObject = new ObjectId(customerId);
        
        const order = new Order({ customerId: customerIdObject, amount });
        await order.save();

        // Update customer's total spends and visits
        const customer = await Customer.findById(customerIdObject);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        customer.totalSpends += amount;
        customer.visits += 1;
        customer.lastVisit = new Date();
        await customer.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
