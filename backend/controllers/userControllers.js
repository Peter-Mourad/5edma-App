const { User } = require('../models/index');
const Joi = require('joi');
const generateQRCode = require('../utils/qrCodeGenerator');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');


const signUp = async (req, res) => {
    var { email, password, firstName, lastName, birthdate, role } = req.body;
    const userData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        role: role
    };

    const validationError = validateSignUp(userData);
    if (validationError) {
        return res.status(403).send({ error: validationError });
    }

    const isEmailTaken = await User.findOne({ where: { email: email } });
    if (isEmailTaken) {
        return res.status(403).send({ error: 'Email is arleady registered to another account!' });
    }
    
    const qrCode = await generateQRCode(email);
    const tokens = jwt.generateTokens(userData);

    userData.qrCode = qrCode;
    userData.refreshToken = tokens.refresh_token;
    
    const user = await User.create(userData);
    return res.status(201).send(tokens);
};

const validateSignUp = (userData) => {
    const signUpSchema = Joi.object({
        email: Joi.string()
            .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'email')
            .required()
            .messages({
                'string.pattern.name': 'Please enter a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/, 'password')
            .required()
            .messages({
                'string.pattern.name': 'Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character',
                'any.required': 'Password is required'
            }),
        firstName: Joi.string()
            .pattern(/^[a-zA-Z\u0600-\u06FF\u0750-\u077F]+$/, 'first name')
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.pattern.name': 'First name must contain only English or Arabic alphabetic characters',
                'string.min': 'First name must be at least 2 characters long',
                'string.max': 'First name cannot exceed 50 characters',
                'any.required': 'First name is required'
            }),
        lastName: Joi.string()
            .pattern(/^[a-zA-Z\u0600-\u06FF\u0750-\u077F]+$/, 'last name')
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.pattern.name': 'Last name must contain only English or Arabic alphabetic characters',
                'string.min': 'Last name must be at least 2 characters long',
                'string.max': 'Last name cannot exceed 50 characters',
                'any.required': 'Last name is required'
            }),
        birthdate: Joi.date()
            .iso()
            .less('now')
            .required()
            .messages({
                'date.base': 'Please enter a valid birthdate',
                'date.less': 'Birthdate cannot be in the future',
                'any.required': 'Birthdate is required'
            }),
        role: Joi.string()
            .valid('مخدوم', 'خادم', 'أمين خدمه')
            .required()
            .messages({
                'any.only': 'Role must be one of خادم, مخدوم, or أمين خدمه',
                'any.required': 'Role is required'
            })
    });

    const { error, value } = signUpSchema.validate(userData, { abortEarly: false });

    if (error) 
        return error.details.map((err) => err.message);

    return null;
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(401).send({ error: 'User not found!' });
    }
    
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        return res.status(401).send({ error: "Password isn't correct!" });
    }

    const tokens = jwt.generateTokens(user);
    return res.send(tokens);
};

const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verifyAccessToken(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.refreshToken = null;
        await user.save();

        res.send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).send({ error: error });
    }
};

const getUserProfile = async (req, res) => {
    console.log(req.user);
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
        const result = await User.destroy({ where: { userID: req.user.id, } });

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

module.exports = {signUp, login, logout, getUserProfile, deleteUserAccount, updateUserData};