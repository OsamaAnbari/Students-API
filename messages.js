const { ObjectId } = require('mongodb')

const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./config')

const Message = require('./schema/messageSchema')
const Admin = require('./schema/adminSchema')
const User = require('./schema/userSchema')

router.use(require('./authentication/adminAuth'))

router.get('/', async (req, res) => {
    Message.find({receiver_id : new ObjectId(req.id)})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/receviers', async (req, res) => {
    if (req.role === 1) {
        User.find({}, {_id : 1, name : 1})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else if (req.role === 2) {
        Admin.find({}, {_id : 1, name : 1})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(401).json({error : { message: "Not authorized, role error" }})
    }
})

/*router.get('/:id', (req, res) => {
    Message.findOne({'_id' : new ObjectId(req.params.id)})
    .then(data => {
        data ? res.status(200).json(data) : res.status(200).json({})
    })
    .catch(err => {
        res.status(502).json(err)
    })
})*/

router.post('/', async (req, res) => {
    try{
        let message = new Message(req.body)
        message.date = Date.now()
        message.sender_id = new ObjectId(req.id)
        message.receiver_id = new ObjectId(req.body.receiver_id)
    
        message.save()
    
        .then(data => {
            res.status(200).json({
                message : "Data is inserted", data
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } catch (err){
        
    }
})

router.put('/:id', (req, res) => {
    Message.updateOne({'_id' : new ObjectId(req.params.id), receiver_id : req.id}, {$set : req.body})
    
    .then(data => {
        res.status(200).json({message : "Data is updated", data})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Message.deleteMany({'_id' : new ObjectId(req.params.id), receiver_id : new ObjectId(req.id)})
    .then(() => {
        res.status(200).json({message : "Data is deleted"})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


module.exports = router