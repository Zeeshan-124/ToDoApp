const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()
const connectToDb = require('./DB/db')
const userRouter = require('./Routes/user.routes')
const todoRouter = require('./Routes/todoList.routes')

connectToDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/todolist', todoRouter)

app.get('/', (req, res) => {
    res.send("server is running")
})

module.exports = app