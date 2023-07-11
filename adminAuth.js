const express = require('express')
const app = express()
const router = express.Router()

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const jwtSecret = '7fb4895dcd29473f09bd3b9d1499246456dd1eda25daf3f66fd4c5bf990e257418e4d3'

const auth = async (req, res, next) => {
    const token = await req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({error : { message: "Not authorized" }})
            } else {
                if (decodedToken.role !== "admin") {
                    return res
                    .status(401)
                    .json({error : { message: "Not authorized, role is not admin" }})
                } else {
                    next()
                }
            }
        })
    } else {
        res
        .status(401)
        .json({error : { message: "Not authorized, no active session" }})
    }
}


module.exports = auth