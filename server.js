const {connectDB} = require('./db.js')
const cookieParser = require("cookie-parser");
const express = require('express')
const cors = require('cors')

const app = express()
app.listen(8080)
connectDB()

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: ['http://localhost:3000', 'mylaravel', 'https://osamaanbari.000webhostapp.com/'],
    credentials: true
}))
app.set("view engine", "ejs")
app.use(express.json())
app.use(cookieParser());

//--------------------------------------------------------------------------------------

app.use('/students/', require('./users'))
app.use('/admins/', require('./admins'))

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