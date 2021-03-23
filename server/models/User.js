const mongoose = require ('mongoose')
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
userSchema.pre('save', function(next){
    console.log('before save', this)
    next()
})

//after save
userSchema.post('save', function(doc, next){
    console.log('after save', doc)
    next()
})

//module.exports= mongoose.model('room', roomSchema)
const User = mongoose.model('user', userSchema)
module.exports = User