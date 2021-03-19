const mongoose = require ('mongoose')

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

//module.exports= mongoose.model('room', roomSchema)
const Room = mongoose.model('room', roomSchema)
module.exports = Room