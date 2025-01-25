const todoListModel = require('../Models/todoList.model')

module.exports.createToDO = async ({
    title, description, user
}) => {
    if (!title || !description) {
        throw new Error('All fields are required')
    }

    const todoList = await todoListModel.create({
        title,
        description,
        user
    })

    return todoList
}

module.exports.updateToDo = async ({
    title, description, id
}) => {
    if (!title || !description) {
        throw new Error('All fields are required')
    }

    const todoList = await todoListModel.findByIdAndUpdate(id, {
        title,
        description,
    })

    return todoList
}


module.exports.deleteToDo = async ({ id }) => {

    const todoList = await todoListModel.findByIdAndDelete(id)

    return todoList
}

module.exports.getToDo = async ({ id }) => {

    const todoList = await todoListModel.find({ user: id }).sort({ createdAt: -1 })

    return todoList
}

module.exports.updateToDoStatus = async ({ completed, id }) => {
    if (typeof completed !== 'boolean') {
        throw new Error("Invalid input: 'expanded' must be a boolean value (true or false)");
    }
    const todoList = await todoListModel.findByIdAndUpdate(id, {
        completed
    })

    return todoList
}

module.exports.updateToDoExpansion = async ({ expanded, id }) => {
    if (typeof expanded !== 'boolean') {
        throw new Error("Invalid input: 'expanded' must be a boolean value (true or false)");
    }
    const todoList = await todoListModel.findByIdAndUpdate(id, {
        expanded
    })

    return todoList
}

