const { addClassUser, removeClassUser, assignRoleToClassUser } = require('../controllers/classUsersController');
const express = require('express');
const verifyToken = require('../middlewares/auth');
const classAuth = require('../middlewares/classAuth');

const router = express.Router();

router.post('/addClassUsers', verifyToken, classAuth, addClassUser);

router.delete('/removeClassUser', verifyToken, classAuth, removeClassUser);

router.put('/assignRoleToClassUser', verifyToken, classAuth, assignRoleToClassUser);

module.exports = router;