const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({message : "logged Out"})
})

module.exports = router