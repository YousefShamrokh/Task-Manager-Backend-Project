const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
}

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})

module.exports = (req,res,next) => {
    const log = `[${new Date().toDateString()}] [${getTime()}] ${req.method} ${req.url}\n`
    console.log(log.trim())
    logStream.write(log)
    next()
}