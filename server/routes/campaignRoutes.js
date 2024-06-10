// server/routes/campaignRoutes.js
const express = require('express');
const { createCampaign } = require('../controllers/campaignController');
const router = express.Router();

router.post('/create', createCampaign);

module.exports = router;
