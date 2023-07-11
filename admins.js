const Mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const UserSchema = new Mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: true,
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
    tc : {
        type: String,
        unique: true,
        required: false,
    },
})

const User = Mongoose.model('admins', UserSchema, 'admins')

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
        res.status(500).json(err)
    })
})

router.post('/', async (req, res) => {
    let user = new User(req.body)

    user.password = await bcrypt.hash(user.password, 10)
    user.save()

    .then(data => {
        res.status(200).json({
            message : "Data is inserted", data
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
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



const jwtSecret = '7fb4895dcd29473f09bd3b9d1499246456dd1eda25daf3f66fd4c5bf990e257418e4d3'

router.post('/login', async (req, res) => {
    let password = req.body.password //await bcrypt.hash(req.body.password, 10)
    
    User.findOne({'tc' : req.body.tc})
    .then(data => {
        bcrypt.compare(password, data.password).then(function (result) {
            if (result) {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: data._id, role: data.role },
                    jwtSecret,
                    { expiresIn: maxAge }
                )
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                    sameSite: None
                })
                
                res.status(200).json({
                    message: "Login successful",
                    data,
                })
            } else {
                res.status(500).json({ message: "Login not succesful" })
            }
        })
    })
    .catch(err => {res.status(500).json(err)})
})

router.post('/logout', async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({message : "logged Out"})
})




module.exports = router