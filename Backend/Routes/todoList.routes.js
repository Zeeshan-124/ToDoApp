const router = require('express').Router()
const userModel = require('../Models/user.model')
const todoListModel = require('../Models/todoList.model')
const todoListController = require('../Controllers/todo.controller')

router.post('/addItem',
    todoListController.addToDoItem
)

router.put('/updateItem/:id',
    todoListController.updateToDoItem
)

router.put('/updateItem/status/:id',
    todoListController.updateToDoItemStatus
)

router.put('/updateItem/expansion/:id',
    todoListController.updateToDoItemExpansion
)

router.delete('/deleteItem/:id',
    todoListController.deleteToDoItem
)

router.get('/getItem/:id',
    todoListController.getToDoItem
)

module.exports = router