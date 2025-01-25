const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, 'First name must be atleast 3 charachters long']
        },
        lastName: {
            type: String,
            minLength: [3, 'Last name must be atleast 3 charachters long']
        }
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        minLength: [5, 'email must be atleast 5 charachters long']
    },
    password: {
        type: String,
        required: true,
        // select: false,
        minLength: [6, 'password must be atleast 6 charachters long']
    },
    todoList: [{
        type: mongoose.Types.ObjectId,
        ref: "todoList"
    }]
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
    }, process.env.JWT_SECRET, { expiresIn: '4h' })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel