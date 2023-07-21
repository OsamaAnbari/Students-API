const {connectDB} = require('./config.js')
const cookieParser = require("cookie-parser");
const express = require('express')
const cors = require('cors')

const app = express()
app.listen(8080)
connectDB()

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'mylaravel', 'https://osamaanbari.000webhostapp.com', 'http://osamaanbari.000webhostapp.com'],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser());

//--------------------------------------------------------------------------------------

app.use('/login', require('./logs/login.js'))
app.use('/logout', require('./logs/logout.js'))
app.use('/password', require('./logs/changepassword.js'))

app.use('/students/', require('./users'))
app.use('/admins/', require('./admins'))
app.use('/activities/', require('./activities'))
app.use('/messages/', require('./messages'))

//--------------------------------------------------------------------------------------

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404, page not found</h1>')
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"
    res.status(err.statusCode).json({
        message: err.message,
    })
})