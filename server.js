const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.router')
const taskRouter = require('./routes/task.router')

const app = express()
app.use(bodyParser.json())

const port = 5300
const url = ""; // add your Database url here
const  connectToDB = async () => {
    try {
       mongoose.set('strictQuery', false)
      await mongoose.connect(url)  
       console.log("🚀 ~ Conected to Mongo DB ~ 🚀")

    } catch(err) {
        console.log("🚀 ~ connectToDB ~ err:", err)
        process.exit()
    }
}


connectToDB()

app.use('/' , userRouter)
app.use('/', taskRouter)

app.use(function(req,res) {
    res.status(404).send({ url : req.originalUrl + ' not found'})
})



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
