const taskModel = require('../models/Task.model')
const jwt = require('jsonwebtoken');

exports.createTask = async function(req,res) {
    try{
    const addTask = await taskModel.create(req.body)
    return res.json({message: "Task added.", data : addTask})
    } catch(err) {
        res.status(400).send({
            message: err
        })
    }
}

exports.getAllTasks = async function(req,res) {
    try {
        let status = req.query.status
        let filter = status ? { status } : {};
        let { page = 1, limit = 10 } = req.query

        page = parseInt(page)
        limit = parseInt(limit)
        
        if (isNaN(page) || page < 1) page = 1
        if (isNaN(limit) || limit < 1) limit = 10

        const tasks = await taskModel.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        res.json({message: `The Tasks` , data: tasks})

    } catch(err){
        res.status(400).send({
            message: err
        })
    }
}

exports.getOneTask = async function(req,res) {
    try {
        const task = await taskModel.findById(req.params.id)
        res.json({message: "Task found.", data : task})
    } catch (err){
        res.status(400).send({
            message: err
        })
    }
}

exports.UpdateTask = async function(req,res){
    try{
        let { id } = req.params
        let {title, description, status} = req.body
        const task = await taskModel.findByIdAndUpdate(id, req.body)
        res.json({message: "Task Updated", data : task})
    } catch(err){
        res.status(400).send({
            message: err
        })
    }
}

exports.DeleteTask = async function(req,res){
    try{
        const task = await taskModel.findByIdAndDelete(req.params.id)
        res.json({message: "Task Deleted"})
    } catch(err){
        res.status(400).send({
            message: err
        })
    }
}