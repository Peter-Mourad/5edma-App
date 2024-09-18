const express = require('express');
const router = express.Router();
const { getUserProfile, deleteUserAccount, updateUserData } = require('../controllers/userControllers');
const verifyToken = require('../middlewares/auth');

router.get('/getUserProfile', verifyToken, getUserProfile);

router.post('/deleteUserAccount', verifyToken, deleteUserAccount);

router.put('/updateUserData', verifyToken, updateUserData);

module.exports = router;