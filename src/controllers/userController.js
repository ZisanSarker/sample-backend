const userModel = require('../models/userModel');
const {validateEmail, validateName, validatePassword} = require('../validations/userValidation');
const {hashPassword,comparePassword} = require('../utils/passwordUtil');
const { generateToken } = require('../utils/tokenUtil');
//Register Controller
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

// Login Controller
const loginController = async (req, res,) => {
    try {
        const { email, password } = req.body;
        // Check if all fields are provided
        if( !email || !password ){
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        }
        // Input Validation
        if (!validateEmail(email) || !validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message: "Invalid input data",
            });
        }
        // Check if the user exists and password is correct
        const user = await userModel.findOne( { email: email });
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "Incorrect password",
            });
        }
        //generate Token (JWT)
        const token = generateToken(user._id, "2h");
        user.password = undefined;

        // Sending Response Message
        res.status(201).send({
            success: true,
            message: "Login successful",
            token,
            user,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    registerController,
    loginController
};
