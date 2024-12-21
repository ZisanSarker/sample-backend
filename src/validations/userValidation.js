const validator = require('validator');

const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validateName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9_ ]*$/;
    return validator.isLength(name, { min: 2 }) && nameRegex.test(name);
};

const validatePassword = (password) => {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
};

module.exports = {
    validateEmail,
    validateName,
    validatePassword,
};
