const express = require('express')
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config')
const Admin = require('../schema/adminSchema')
const User = require('../schema/userSchema')

router.post('/admin', async (req, res) => {
    let password = req.body.password //await bcrypt.hash(req.body.password, 10)
    
    Admin.findOne({'tc' : req.body.tc})
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
                    sameSite: 'none',
                    secure: true
                })
                
                res.status(200).json({
                    message: "Login successful",
                    data : {
                        _id : data._id,
                        name : data.name,
                        surname : data.surname,
                        role : data.role
                    }
                })
            } else {
                res.status(500).json({ message: "Login not succesful" })
            }
        })
    })
    .catch(err => {res.status(500).json(err)})
})

router.post('/user', async (req, res) => {
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
                    sameSite: 'none',
                    secure: true
                })
                
                res.status(200).json({
                    message: "Login successful",
                    data : {
                        _id : data._id,
                        name : data.name,
                        surname : data.surname,
                        role : data.role
                    }
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