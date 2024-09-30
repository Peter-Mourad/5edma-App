const { User } = require('../models/index');

const getUserProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    return res.json({
        "userId": user.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "role": user.role,
        "birthdate": user.birthdate,
        "qrCode": user.qrCode,
    });
};

const deleteUserAccount = async (req, res) => {
    try {
        const result = await User.destroy({ where: { userId: req.user.id, } });

        if (!result) {
            res.status(404).json({ message: `User Not found.` });
        }
        res.json({ message: `User was deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateUserData = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    try {
        await user.update(req.body.user);
        return res.send({ user });
    } catch (error) {
        return res.status(403).send({ error: error });
    }
};

module.exports = {getUserProfile, deleteUserAccount, updateUserData}