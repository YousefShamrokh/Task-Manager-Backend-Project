const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = Schema({
    title: String,
    description: String,
    status: String,
}, { collection: 'Tasks'})

module.exports = mongoose.model('Tasks', taskSchema)