const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    expanded: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId, // Single user ID
        ref: "user"
    }
}, { timestamps: true });

const todoListModel = mongoose.model('todoList', todoListSchema)

module.exports = todoListModel