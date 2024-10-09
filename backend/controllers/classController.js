const { Op, fn, col } = require('sequelize');
const { Class, ClassUser, User } = require('../models/index');
const sequelize = require('../models/connection');
const Joi = require('joi');

const createClass = async (req, res) => {
    const classSchema = Joi.object({
        className: Joi.string()
            .pattern(/^[A-Za-zأ-ي\s]+$/)
            .min(3)
            .max(50)
            .required()
            .messages({
                'string.pattern.name': 'Class name must contain only English or Arabic alphabetic characters',
                'string.min': 'Class name must be at least 3 characters long',
                'string.max': 'Class name cannot exceed 50 characters',
                'any.required': 'Class name is required'
            }),
    });

    const classData = {
        className: req.body.className,
        creatorId: req.user.id
    };

    const { error, result } = classSchema.validate({ className: classData.className });
    if (error) {
        return res.status(400).send({ error: error.details });
    }

    try {
        const newClass = await Class.create(classData);

        // then add the creator to the class with role 'creator'
        await ClassUser.create({
            userId: newClass.creatorId,
            classId: newClass.classId,
            role: 'creator'
        });

        return res.send({ message: 'Class created successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const classInstance = await Class.findByPk(req.query.classId);
        if (!classInstance) {
            return res.status(404).json({ error: "This Class doesn't exist!" });
        }

        await Class.destroy({where: {classId: req.query.classId}});
        return res.json({message: "The class is deleted successfuly"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editClass = async (req, res) => {
    try {
        const classInstance = await Class.findByPk(req.body.classId);
        if (!classInstance) {
            return res.status(404).json({ error: `Class isn't found` });
        }

        const className = req.body.className || classInstance.className;
        await classInstance.update({className});
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getListOfBirthdaysInMonth = async (req, res) => {
    const month = req.body.month;
    if (!month) {
        return res.status(400).json({ message: 'No month is specified!' });
    }
    try {
        const users = await ClassUser.findAll({
            where: {
                classId: req.body.classId,
                role: 'member'
            },
            include: {
                model: User,
                required: true,
                where: {
                    [Op.and]: sequelize.where(
                        sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM birthdate')),
                        req.body.month
                    )
                }
            }
        });
        return res.send({users});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { createClass, deleteClass, editClass, getListOfBirthdaysInMonth };