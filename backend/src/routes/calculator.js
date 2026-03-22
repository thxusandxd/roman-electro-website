const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const { validateCalculator } = require('../middleware/validation');

router.post('/save', validateCalculator, calculatorController.save);
router.get('/pricing', calculatorController.getPricing);

module.exports = router;
