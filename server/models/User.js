const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const {isEmail} = require ('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter a name']
    },
    email:{
        type:String,
        required:[true, 'Please enter an email'],
        unique: [true, 'Email already exist'],
        lowercase: true,
        validate: [isEmail, 'please enter valid email']
    },
    password:{
        type:String,
        required:[true, 'Please enter a password'],
        minlength: [6, 'The password should be at least 6 character']
    },
})

//before save
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash (this.password, salt)
    next()
})

//module.exports= mongoose.model('room', roomSchema)
const User = mongoose.model('user', userSchema)
module.exports = User