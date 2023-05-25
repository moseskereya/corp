const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/avatar-profile-colorful-illustration-2_549209-82.jpg?w=826'
    },
})


module.exports = mongoose.model('User', UserSchema);