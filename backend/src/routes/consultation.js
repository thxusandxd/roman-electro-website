const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { validateConsultation } = require('../middleware/validation');

router.post('/', validateConsultation, consultationController.create);
router.get('/', consultationController.getAll);
router.patch('/:id/status', consultationController.updateStatus);

module.exports = router;
