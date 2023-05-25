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

const Invite = asyncHandler(async (req, res) => {
try {
    const { todoId } = req.params;
    const { recipientId } = req.body;
    // Find the todo by ID
    const todo = await Todo.findById(todoId);
    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if the sender has permission to invite collaborators
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to invite collaborators' });
    }

    // Check if the recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Add the recipient to the collaborators array
    if (!todo.collaborators.includes(recipientId)) {
      todo.collaborators.push(recipientId);
      await todo.save();
    }

    res.json({ message: 'Invitation sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})



module.exports = {
  getTodos,
  setTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  Invite
}