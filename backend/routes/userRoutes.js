const { signUp, login, logout, deleteUserAccount } = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');

const express = require('express');

const router = express.Router();

router.post('/signUp', signUp);

router.post('/login', login);

router.post('/logout', verifyToken, logout);

router.delete('/deleteUserAccount', verifyToken, deleteUserAccount);

module.exports = router;