const asyncHandler = require('express-async-handler')
const Todo = require('../models/todo')
const User = require('../models/user')


const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id })
  res.status(200).json(todos)
})

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  res.status(200).json(todo)
})

const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(todo)
})


const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }


  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  if (todo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})


const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }


  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await todo.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTodos,
  setTodo,
  getTodo,
  updateTodo,
  deleteTodo,
}