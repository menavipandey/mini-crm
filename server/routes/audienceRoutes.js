// server/routes/audienceRoutes.js
const express = require('express');
const { checkAudienceSize, saveAudience } = require('../controllers/audienceController');
const router = express.Router();

router.post('/size', checkAudienceSize);
router.post('/save', saveAudience);

module.exports = router;
