const blacklistedTokenModel = require('../Models/blacklistedToken.model')
const userModel = require('../Models/user.model')
const userService = require('../Services/user.service')
const { validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullName, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email: email })
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'user already exists' })
    }

    const hashPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email: email,
        password: hashPassword
    })

    const token = user.generateAuthToken()
    const { password: userPassword, ...userInformation } = user

    res.status(201).json({ userInformation, token })
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const { password: userPassword, ...userInformation } = user._doc

    const token = user.generateAuthToken()

    res.status(200).json({ userInformation, token })
}

module.exports.getUserProfile = async (req, res, next) => {
    if (!req.user) {
        res.status(404).json({ message: 'User not found' })
    }
    const { password, ...userInformation } = req.user._doc
    return res.status(200).json({ userInformation })
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).json({ message: 'No token provide' })
    }
    const isBlacklisted = await blacklistedTokenModel.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(200).json({ message: 'User is already logged out' })
    }

    const blacklistedToken = await blacklistedTokenModel.create({ token })

    res.status(200).json({ message: 'Logged out successfully', blacklistedToken })
}