const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, { collection: 'Taskusers' })

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password) 
    
}

module.exports = mongoose.model('Users', userSchema)