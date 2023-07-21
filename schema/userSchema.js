const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    tc : {
        type: String,
        unique: true,
        required: true,
    },
    name : {
        type: String,
        unique: false,
        required: true,
    },
    surname : {
        type: String,
        unique: false,
        required: true,
    },
    department : {
        type: String,
        unique: false,
        required: true,
    },
    mobile : {
        type: String,
        unique: false,
        required: true,
    },
    email : {
        type: String,
        unique: false,
        required: false,
    },
    image : {
        type: String,
        unique: false,
        required: false,
    },
    password : {
        type: String,
        unique: false,
        required: true,
    },
    role : {
        type: String,
        default: "student"
    },
})

const User = Mongoose.model('students', UserSchema, 'students')

module.exports = User