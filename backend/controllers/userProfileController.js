const { User } = require('../models/index');
const multer = require('multer');
const { uploadImage } = require('../services/cloudinaryService');
const { error } = require('console');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        return res.json({
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "birthdate": user.birthdate,
            "qrCode": user.qrCode,
            "profilePicture": user.profilePicture
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateUserData = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.body.email) {
            const emailExists = await User.findOne({ where: { email: req.body.email } });
            if (emailExists) {
                return res.status(400).json({ error: 'This email is already in use!' });
            }
        }

        const updatedUserData = {
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            email: req.body.email || user.email,
            birthdate: req.body.birthdate || user.birthdate
        };

        await user.update(updatedUserData);
        return res.send(updatedUserData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const updateUserProfilePicture = async (req, res) => {
    try {
        const filePath = req.file.path;
        if (!filePath) {
            return res.status(400).json({ error: 'No file is provided!' });
        }

        const photoUrl = await uploadImage(filePath);
        await User.update({'profilePicture' : photoUrl}, { where: { userId: req.user.id } });
        return res.status(200).json({ message: 'Photo uploaded successfully', photoUrl });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserProfile, updateUserData, updateUserProfilePicture };