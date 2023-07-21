const Mongoose = require('mongoose')

const ActivitySchema = new Mongoose.Schema({
    name : {
        type: String,
        unique: false,
        required: false,
    },
    date : {
        type: String,
        unique: false,
        required: true,
    },
    time : {
        type: String,
        unique: false,
        required: true,
    },
    teacher : {
        type: String,
        unique: false,
        required: false,
    },
})

const Activity = Mongoose.model('activities', ActivitySchema, 'activities')

module.exports = Activity