const todoService = require('../Services/todoList.service')
const userModel = require('../Models/user.model')
const todoListModel = require('../Models/todoList.model')

module.exports.addToDoItem = async (req, res, next) => {
    const { title, description, email } = req.body;
    const doesUserExists = await userModel.findOne({ email: email });
    if (!doesUserExists) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    const todoItem = await todoService.createToDO({
        title,
        description,
        user: doesUserExists._id // Single user ID
    });

    doesUserExists.todoList.push(todoItem);
    await doesUserExists.save();

    res.status(200).json({ todoItem });
};


module.exports.updateToDoItem = async (req, res, next) => {
    try {
        const { title, description, email } = req.body
        const doesUserExists = await userModel.findOne({ email: email })
        if (!doesUserExists) {
            return res.status(400).json({ message: 'Unauthorized' })
        }
        const todoItem = await todoService.updateToDo({
            title: title,
            description: description,
            id: req.params.id
        })

        todoItem.save()

        res.status(200).json({ message: 'Updated successfully' })

    } catch (error) {
        console.log("Wrong data");
    }
}

module.exports.updateToDoItemStatus = async (req, res, next) => {
    try {
        const { completed, email } = req.body
        const doesUserExists = await userModel.findOne({ email: email })
        if (!doesUserExists) {
            return res.status(400).json({ message: 'Unauthorized' })
        }
        const todoItem = await todoService.updateToDoStatus({
            completed: completed,
            id: req.params.id
        })

        todoItem.save()

        res.status(200).json({ message: 'Status updated successfully' })

    } catch (error) {
        console.log("Wrong data");
    }
}

module.exports.updateToDoItemExpansion = async (req, res, next) => {
    try {
        const { expanded, email } = req.body
        const doesUserExists = await userModel.findOne({ email: email })
        if (!doesUserExists) {
            return res.status(400).json({ message: 'Unauthorized' })
        }
        const todoItem = await todoService.updateToDoExpansion({
            expanded: expanded,
            id: req.params.id
        })

        todoItem.save()

        res.status(200).json({ message: 'expansion updated successfully' })

    } catch (error) {
        console.log("Wrong data");
    }
}


module.exports.deleteToDoItem = async (req, res, next) => {
    try {
        const { email } = req.body
        const doesUserExists = await userModel.findOneAndUpdate({ email }, { $pull: { todoList: req.params.id } })
        if (!doesUserExists) {
            return res.status(400).json({ message: 'Unauthorized' })
        }
        await todoService.deleteToDo({
            id: req.params.id
        })

        res.status(200).json({ message: 'Deleted successfully' })

    } catch (error) {
        console.log("Wrong data");
    }
}


module.exports.getToDoItem = async (req, res, next) => {
    try {
        const todoItem = await todoService.getToDo({
            id: req.params.id
        });

        if (todoItem.length !== 0) {
            res.status(200).json({ todoItems: todoItem }); // Ensure response has `todoItems` property
        } else {
            res.status(200).json({ message: 'No task' });
        }
    } catch (error) {
        console.log("Wrong data");
    }
};