const usersModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.register = async function(req,res) {
    try {
        let newUser = new usersModel(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        newUser.password = hashedPassword
        let user = await newUser.save()
        const token = jwt.sign({email: user.email , _id: user._id, role: user.role}, 'secretKey')
        return res.json( {message:"User registered successfully" , user: {jwt: token} })
    } catch(err) {
        console.log("🚀 ~ exports.register=function ~ err:", err)
        res.status(400).send({
            message: err
        })
    }
}

exports.login = async function(req,res) {
    try {
        let user = await usersModel.findOne({email: req.body.email })
        let comparePassword = await user.comparePassword(req.body.password)
        if(!user || ! comparePassword ) {
            res.status(400).send({ message: 'Invalid Email or Password' })
        } else {
            const token = jwt.sign({email: user.email , _id: user._id, role: user.role}, 'secretKey')
            return res.json( {message:"User Logged in Successfully" , user: {jwt: token} })
        }

        
    } catch(err) {
    console.log("🚀 ~ exports.login=function ~ err:", err)
    res.status(400).send({
        message: err
    })
    }
}

exports.logout = async function(req,res) {
    try {
            return res.json({message:`User Logged out Successfully` })
        } catch(err) {
        res.status(400).send({
            message: err
        })
    }
}

exports.deleteUser = async function(req,res) {
    try{
    if(req.user.role === 'Admin'){ 
    await usersModel.findByIdAndDelete(req.params.id)
    res.json({message: "User Deleted."})
    }
        else res.status(400).send({message:"You are not authorized to delete users."})

    } catch (err) {
    res.status(400).send({
        message: err
       })
    }
}