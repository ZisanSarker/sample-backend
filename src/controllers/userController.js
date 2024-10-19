const userModel = require('../models/userModel');
const {validateEmail, validateName, validatePassword} = require('../validations/userValidation');
const {hashPassword} = require('../utils/passwordUtil');

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }
        // Input Validation
        if (!validateEmail(email) || !validateName(name) || !validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message: "Invalid input data",
            });
        }
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "Email already registered",
            });
        }
        // Hash the password using bcrypt
        const hashedPassword = await hashPassword(password);
        // Create and save new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "Registration successful. Please verify your email.",
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerController,
};
