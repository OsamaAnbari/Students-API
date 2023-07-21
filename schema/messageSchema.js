const Mongoose = require('mongoose')

const MessageSchema = new Mongoose.Schema({
    sender_id : {
        type: Mongoose.Schema.ObjectId,
        unique: false,
        required: false,
    },
    sender_name : {
        type: String,
        unique: false,
        required: false,
    },
    receiver_id : {
        type: Mongoose.Schema.ObjectId,
        unique: false,
        required: false,
    },
    content : {
        type : String,
        unique: false,
        required: false,
    },
    subject : {
        type : String,
        unique: false,
        required: false,
    },
    time : {
        type : String,
        unique: false,
        required: false,
    },
    date : {
        type : String,
        unique: false,
        required: false,
    },
    read : {
        type : Boolean,
        unique: false,
        required: false,
        default : false
    }
})

const Message = Mongoose.model('messages', MessageSchema, 'messages')

module.exports = Message