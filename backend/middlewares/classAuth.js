const { error } = require('console');
const { ClassUser } = require('../models/index');

const classAuth = async (req, res, next) => {
    try {
        const classUser = await ClassUser.findOne({
            classId: req.body.classId,
            userId: req.user.id
        });
        
        if (!classUser || (classUser && classUser.role == 'member')) {
            return res.status(403).json({ error: `User doesn't have permission to do this action` });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = classAuth;