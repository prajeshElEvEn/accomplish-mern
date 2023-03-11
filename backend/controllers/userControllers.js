const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

// @desc    Register User
// @route   POST /api/users/
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201)
            .json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Login User
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check for user email
    const user = await User.findOne({ email })
    const checkPassword = await bcrypt.compare(password, user.password)
    if (user && checkPassword) {
        res.status(200)
            .json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get User data
// @route   GET /api/users/me
// @access  public
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User data'
    })
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}
