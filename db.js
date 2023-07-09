const Mongoose = require('mongoose')
const dbstr = "mongodb+srv://osama3nbri13:asdrasdr1@cluster0.j3gm3vp.mongodb.net/asil_vakif?retryWrites=true&w=majority"
const connectDB = async () => {
    await Mongoose.connect(dbstr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Database is connected')
}

module.exports = {connectDB}