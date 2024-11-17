const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../modals/User.modal.js");
const { validateRegisterUser, validateLoginUser } = require('../validations/userValidation.js');


const JWT_SECRET = process.env.JWT_SECRET;

exports.createUser = async (req, res) => {
    try {
        const { error } = validateRegisterUser(req.body);
        if (error) return res.status(400).send({
            Success: false,
            message: 'User Cannot be Created',
            error: error.details[0].message
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const data = { ...req.body, password: hashedPassword };
        const createdData = await User.create(data);

        const token = jwt.sign({ userId: createdData._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'None'
        });
        return res.status(200).send({
            Success: true,
            message: 'User Created Successfully',
            data: createdData
        });
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).send({
                Success: false,
                message: `User Cannot be Created. The ${field} is already in use.`,
                error: error.keyValue
            });
        }

        return res.status(500).send({
            Success: false,
            message: 'User Cannot be Created',
            error: error.message
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { error } = validateLoginUser(req.body);
        if (error) return res.status(400).send({
            Success: false,
            message: 'Invalid Input',
            error: error.details[0].message
        });

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                Success: false,
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                Success: false,
                message: 'Invalid password'
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'None'
        });

        return res.status(200).send({
            Success: true,
            message: 'User logged in successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            Success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.logoutUser = (req, res) => {
    res.clearCookie('authToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(200).send({
        Success: true,
        message: 'User logged out successfully'
    });
};

exports.getUser = async (req, res) => {
    const id = req.user.userId;
    try {
        const user = await User.findById(id);
        return res.status(200).send({
            Success: true,
            message: 'User Fetched Successfully',
            data: user
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            Success: false,
            message: 'User Cannot be Fetched',
            error: error
        });
    }
}

exports.deleteAllUser = async (req, res) => {
    try {
        const users = await User.deleteMany();
        return res.status(200).send({
            Success: true,
            message: 'User Deleted Successfully',
            data: users
        });
    } catch (error) {
        return res.status(404).send({
            Success: false,
            message: 'User Cannot be Deleted',
            error: error
        });
    }
}
