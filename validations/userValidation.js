const Joi = require("joi");

const userValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    number: Joi.number().integer().min(1000000000).max(9999999999).required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.'
        })
});

exports.validateRegisterUser = (userData) => {
    return userValidationSchema.validate(userData);
};

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

exports.validateLoginUser = (userData) => {
    return loginValidationSchema.validate(userData);
};
