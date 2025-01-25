const userModel = require('../Models/user.model')
const jwt = require('jsonwebtoken')
const blacklistedTokenModel = require('../Models/blacklistedToken.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isBlacklisted = await blacklistedTokenModel.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}