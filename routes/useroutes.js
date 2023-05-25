const express = require('express');
const { register, login, getMe, logout } = require('../controllers/UserController');
const {protect} = require('../middlewares/AuthMiddleware')
const router = express.Router();

router.post('/', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/logout', protect, logout)

module.exports = router