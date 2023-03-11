const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register User
// @route   POST /api/users/
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User Registered'
    })
})

// @desc    Login User
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User Logged in'
    })
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
