const mongoose = require ('mongoose')

const messageSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    room_id:{
        type:String,
        required:true
    },
}, { timestamps : true })

//module.exports= mongoose.model('room', roomSchema)
const Message = mongoose.model('message', messageSchema)
module.exports = Message