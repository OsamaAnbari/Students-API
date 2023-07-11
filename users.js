const Mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const express = require('express')
const app = express()
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

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
    }
})

const User = Mongoose.model('students', UserSchema, 'students')

router.use(require('./adminAuth'))

router.get('/', (req, res) => {
    User.find({}/*, {_id : 1, name : 1}*/)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    User.findOne({'_id' : new ObjectId(req.params.id)})
    .then(data => {
        data ? res.status(200).json(data) : res.status(200).json({})
    })
    .catch(err => {
        res.status(502).json(err)
    })
})

router.post('/', async (req, res) => {
    let user = new User(req.body)

    const exist = await User.findOne({tc: req.body.tc})

    if(exist){
        res.status(400).json({message: "This TC is exists"})
    } else {
        const password = req.body.tc.substring(0, 4) + "Asil"
        user.password = await bcrypt.hash(password, 10)
        user.save()
    
        .then(data => {
            res.status(200).json({
                message : "Data is inserted", data
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
})

router.put('/:id', (req, res) => {
    User.updateOne({'_id' : new ObjectId(req.params.id)}, {$set : req.body})
    
    .then(data => {
        res.status(200).json({message : "Data is updated", data})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    User.deleteMany({'_id' : new ObjectId(req.params.id)})
    .then(() => {
        res.status(200).json({message : "Data is deleted"})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



//module.exports = {getbyID, insert, removee, updatee, findUser, auth}
module.exports = router