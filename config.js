const Mongoose = require('mongoose')
const dbstr = "mongodb+srv://osama3nbri13:asdrasdr1@cluster0.j3gm3vp.mongodb.net/asil_vakif?retryWrites=true&w=majority"
const connectDB = async () => {
    await Mongoose.connect(dbstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Database is connected')
}

const jwtSecret = '7fb4895dcd29473f09bd3b9d1499246456dd1eda25daf3f66fd4c5bf990e257418e4d3'

module.exports = {connectDB, jwtSecret}