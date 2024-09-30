const { logout } = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post('/logout', logout);

module.exports = router;