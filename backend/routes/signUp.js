const { signUp } = require('../controllers/userControllers');
const express = require('express');

const router = express.Router();

router.post('/signUp', signUp);

module.exports = router;