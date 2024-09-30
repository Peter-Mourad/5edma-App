const express = require('express');
const router = express.Router();
const { getUserProfile, deleteUserAccount, updateUserData } = require('../controllers/userProfileController');
const verifyToken = require('../middlewares/auth');

router.get('/getUserProfile', verifyToken, getUserProfile);

router.put('/updateUserData', verifyToken, updateUserData);

module.exports = router;