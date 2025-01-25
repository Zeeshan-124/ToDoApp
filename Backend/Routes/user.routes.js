const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../Controllers/user.controller')
const { authUser } = require('../Middlewares/auth.middleware')

router.post('/register',
    [
        body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be atleast 3 charachters long '),
        body('email').isEmail().isLength({ min: 5 }).withMessage('Please enter a valid & atleast 5 charachters long email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 charachters long ')
    ],
    userController.registerUser
)

router.post('/login',
    [
        body('email').isEmail().isLength({ min: 5 }).withMessage('Please enter a valid & atleast 5 charachters long email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 charachters long ')
    ],
    userController.loginUser
)

router.get('/profile',
    authUser,
    userController.getUserProfile
)


router.get('/logout',
    authUser,
    userController.logoutUser
)

module.exports = router