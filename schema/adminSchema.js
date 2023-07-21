const Mongoose = require('mongoose')

const AdminSchema = new Mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: true,
    },
    surname : {
        type : String,
        unique : true,
        require : false,
    },
    tc : {
        type: String,
        unique: true,
        required: false,
    },
    password : {
        type: String,
        unique: true,
        required: false,
        default: "asdasdasd"
    },
    role : {
        type: String,
        default: "admin"
    },
})

const Admin = Mongoose.model('admins', AdminSchema, 'admins')

module.exports = Admin