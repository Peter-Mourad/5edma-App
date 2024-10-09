const { createClass, deleteClass, editClass, getListOfBirthdaysInMonth } = require('../controllers/classController');
const express = require('express');
const verifyToken = require('../middlewares/auth');
const classAuth = require('../middlewares/classAuth');

const router = express.Router();

router.post('/createClass', verifyToken, createClass);

router.delete('/deleteClass', verifyToken, classAuth, deleteClass);

router.put('/editClass', verifyToken, classAuth, editClass);

router.get('/getListOfBirthdaysInMonth', verifyToken, classAuth, getListOfBirthdaysInMonth);

module.exports = router;