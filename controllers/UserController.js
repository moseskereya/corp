const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user')

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add in all fields')
    }
    const UserExist = await User.findOne({ email })
    if (UserExist) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            user: user,
            token: generateJwt(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Inavlid User data')
    }
})


const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            user: user,
            token: generateJwt(user._id)
        })
    } else {
       res.status(400)
        throw new Error('Inavlid User Credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        _id: _id,
        name,
        email
    })
})

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
})


const generateJwt = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '90d'})
}


module.exports = {
    register,
    login,
    getMe,
    logout
} 