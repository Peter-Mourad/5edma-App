const { Class, ClassUser } = require('../models/index');

const addClassUser = async (req, res) => {
    const classUser = {
        userId: req.body.userId,
        classId: req.body.classId,
        role: req.body.role
    }

    if (classUser.role != 'member' && classUser.role != 'admin') {
        return res.status(400).json({ error: `invalid role name it should be "member" or "admin"!` });
    }

    const userInClass = await ClassUser.findOne({ where: { userId: classUser.userId, classId: classUser.classId } });
    if (userInClass) {
        return res.status(400).send({ error: 'The user is arleady in this class' });
    }

    try {
        await ClassUser.create(classUser);
    }
    catch (error) {
        return res.status(400).send({ error: error.errors[0].message });
    }
    return res.send({ message: 'User is added to the class successfully' });
};

const removeClassUser = async (req, res) => {
    try {
        await ClassUser.destroy({
            where: {
                userId: req.body.userId,
                classId: req.body.classId
            }
        });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};

const assignRoleToClassUser = async (req, res) => {
    const classUser = await ClassUser.findOne({
        userId: req.body.userId,
        classId: req.body.classId
    });

    if (!classUser) {
        return res.status(404).json({ error: 'User not found in the class!' });
    }

    try {
        await classUser.update({ role: req.body.role });
        return res.json({ message: 'User role updated successfully' });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

module.exports = { addClassUser, removeClassUser, assignRoleToClassUser };