const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createJWT = id => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: process.env.MAX_AGE
    })
}

const alertError = (err) => {
    let errors = {name:'',email:'', password:''}
    if(err.code === 11000) {
        errors.email = 'Email already exist'
        return errors
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>
        {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.signup = async (req,res) => {
    
    const {name, email, password} = req.body
    try{
        const user = await User.create({name, email, password})
        const token = createJWT(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge* 1000})
        res.status(201).json({
            message: `Welcome ${name}!`,
            data: user})

    }catch(error){
        let errors = alertError(error)
        res.status(400).json({errors})
    }
    
}
module.exports.login = (req,res) => {
    res.send('login')
}
module.exports.logout = (req,res) => {
    res.send('logout')
}