// server/controllers/audienceController.js
const Audience = require('../models/Audience');
const Customer = require('../models/Customer');

exports.checkAudienceSize = async (req, res) => {
  const { rules } = req.body;

  // Build query based on rules
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

  try {
    const audienceSize = await Customer.countDocuments(query);
    res.json({ size: audienceSize });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveAudience = async (req, res) => {
  const { rules } = req.body;

  try {
    const newAudience = new Audience({ rules });
    await newAudience.save();
    res.status(201).json(newAudience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
