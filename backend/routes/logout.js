const { logout } = require('../controllers/userControllers');
const express = require('express');

const router = express.Router();

router.post('/logout', logout);

module.exports = router;