const express = require('express');
const router = express.Router();
const {getTodos, setTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/TodoControllers')
const {protect} = require('../middlewares/AuthMiddleware')

router.get('/', protect, getTodos)
router.get('/:id', getTodo)
router.post('/', protect, setTodo)
router.put('/:id', protect, updateTodo)
router.delete('/:id', protect, deleteTodo)


module.exports = router