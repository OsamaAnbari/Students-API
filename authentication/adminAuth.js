const express = require('express')
const app = express()
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config')

const auth = async (req, res, next) => {
    const token = await req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({error : { message: "Not authorized" }})
            } else {
                if (decodedToken.role === 'admin') {
                    req.role = 1
                    req.id = decodedToken.id
                    next()
                } else if (decodedToken.role === 'student') {
                    req.role = 2
                    req.id = decodedToken.id
                    next()
                } else {
                    return res
                    .status(401)
                    .json({error : { message: "Not authorized, role error" }})
                }
                /*if (decodedToken.role !== "admin") {
                    return res
                    .status(401)
                    .json({error : { message: "Not authorized, role is not admin" }})
                } else {
                    next()
                }*/
            }
        })
    } else {
        res
        .status(401)
        .json({error : { message: "Not authorized, no active session" }})
    }
}


module.exports = auth