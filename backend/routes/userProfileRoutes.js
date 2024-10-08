const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserData, updateUserProfilePicture } = require('../controllers/userProfileController');
const verifyToken = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/getUserProfile', verifyToken, getUserProfile);

router.put('/updateUserData', verifyToken, updateUserData);

router.post('/updateUserProfilePicture', verifyToken, upload.single('picture'), updateUserProfilePicture);

module.exports = router;