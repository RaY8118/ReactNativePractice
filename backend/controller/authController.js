const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // Convert password to string to avoid bcrypt error
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);  // Ensure password is a string

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully!',
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            message: 'Server error',
        });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials', // General message for security reasons
            });
        }

        // Ensure password is treated as a string before comparison
        const isMatch = await bcrypt.compare(password.toString(), user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Credentials',
            });
        }

        res.status(200).json({
            message: 'Login Successful',
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            message: 'Server error',
        });
    }
};

module.exports = { register, login };
