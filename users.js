const { ObjectId } = require('mongodb')
const User = require('./schema/userSchema')

const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")

router.use(require('./authentication/adminAuth'))

router.get('/', (req, res) => {
    if(req.role === 1) {
        User.find({}/*, {_id : 1, name : 1}*/)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else if (req.role === 2) {
        User.find({_id : req.id}/*, {_id : 1, name : 1}*/)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
})

router.get('/:id', (req, res) => {
    if(req.role === 1) {
        User.findOne({'_id' : new ObjectId(req.params.id)})
        .then(data => {
            data ? res.status(200).json(data) : res.status(200).json({})
        })
        .catch(err => {
            res.status(502).json(err)
        })
    } else {
        res.status(401).json({error : { message: "Not authorized, role error" }})
    }
})

router.post('/', async (req, res) => {
    if(req.role === 1) {
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
    } else {
        res.status(401).json({error : { message: "Not authorized, role error" }})
    }
})

router.put('/:id', (req, res) => {
    if(req.role === 1) {
        User.updateOne({'_id' : new ObjectId(req.params.id)}, {$set : req.body})
        
        .then(data => {
            res.status(200).json({message : "Data is updated", data})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(401).json({error : { message: "Not authorized, role error" }})
    }
})

router.delete('/:id', (req, res) => {
    if(req.role === 1) {
        User.deleteMany({'_id' : new ObjectId(req.params.id)})
        .then(() => {
            res.status(200).json({message : "Data is deleted"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    } else {
        res.status(401).json({error : { message: "Not authorized, role error" }})
    }
})

module.exports = router