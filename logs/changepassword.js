const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")

const Admin = require('../schema/adminSchema')
const User = require('../schema/userSchema')

router.use(require('../authentication/adminAuth'))

router.put('/', async (req, res) => {
    if(req.role === 1) {
        try {
            Admin.findOne({_id : req.id})
            .then(data => {
                bcrypt.compare(req.body.old, data.password).then(function async (result) {
                    if (result) {
                        bcrypt.hash(req.body.new, 10).then((neww) => {
                            Admin.updateOne({_id : req.id}, {password : neww})
                            .then(data => {
                                res.status(200).json(data)
                            })
                        })
                    } else {
                        res.status(400).json({message : "Password is wrong"})
                    }
                })
            })
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (req.role === 2) {
        try {
            User.findOne({_id : req.id})
            .then(data => {
                bcrypt.compare(req.body.old, data.password).then(function async (result) {
                    if (result) {
                        bcrypt.hash(req.body.new, 10).then((neww) => {
                            Admin.updateOne({_id : req.id}, {password : neww})
                            .then(data => {
                                res.status(200).json(data)
                            })
                        })
                    } else {
                        res.status(400).json({message : "Password is wrong"})
                    }
                })
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

module.exports = router