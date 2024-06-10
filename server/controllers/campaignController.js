// server/controllers/campaignController.js
const Campaign = require('../models/Campaign');
const Audience = require('../models/Audience');
const Customer = require('../models/Customer');

exports.createCampaign = async (req, res) => {
  const { audienceId, message } = req.body;

  try {
    const audience = await Audience.findById(audienceId);
    if (!audience) {
      return res.status(404).json({ error: 'Audience not found' });
    }

    const newCampaign = new Campaign({ audienceId, message });
    await newCampaign.save();

    // Simulate sending messages
    const customers = await Customer.find(buildQuery(audience.rules));
    customers.forEach(customer => {
      sendDummyMessage(customer, message, newCampaign._id);
    });

    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
const buildQuery = (rules) => {
  const query = {};
  rules.forEach(rule => {
    if (rule.field === 'totalSpends') {
      query.totalSpends = { $gt: rule.value };
    } else if (rule.field === 'visits') {
      query.visits = { $lte: rule.value };
    } else if (rule.field === 'lastVisit') {
      const date = new Date();
      date.setMonth(date.getMonth() - rule.value);
      query.lastVisit = { $lt: date };
    }
  });
  return query;
};

const sendDummyMessage = (customer, message, campaignId) => {
  // Simulate API call to send message
  setTimeout(() => {
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    // Update campaign status
    Campaign.updateOne({ _id: campaignId }, { status }).exec();
    console.log(`Message to ${customer.name} ${status}`);
  }, 1000);
};
