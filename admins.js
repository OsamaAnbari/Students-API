const { ObjectId } = require('mongodb')
const Admin = require('./schema/adminSchema')

const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")

router.get('/', (req, res) => {
    Admin.find({}/*, {_id : 1, name : 1}*/)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Admin.findOne({'_id' : new ObjectId(req.params.id)})
    .then(data => {
        data ? res.status(200).json(data) : res.status(200).json({})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', async (req, res) => {
    let user = new Admin(req.body)

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
    Admin.updateOne({'_id' : new ObjectId(req.params.id)}, {$set : req.body})
    
    .then(data => {
        res.status(200).json({message : "Data is updated", data})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Admin.deleteMany({'_id' : new ObjectId(req.params.id)})
    .then(() => {
        res.status(200).json({message : "Data is deleted"})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router