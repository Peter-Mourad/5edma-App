const { deleteUserAccount } = require('../controllers/userControllers');
const express = require('express');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.delete('/deleteUserAccount', verifyToken, deleteUserAccount);

module.exports = router;