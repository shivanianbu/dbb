const express = require("express")
const router = express.Router()
const app = express()
const mongoose = require("mongoose")
// const userController = require("../controller/userController")
const serverless=require('serverless-http')
app.use(express.json())

mongoose.connect('mongodb+srv://root:root@cluster0.g3ggddi.mongodb.net/newtest');

mongoose.connection
    .once("open", () => console.log("DB Connected Successfully..."))
    .on("error", (error) => console.log("āError connecting to MongoDB:", error));
    
// app.use("/user",userController)

router.get("/",function(req,res){
    res.json({mess: "ok"})
})

app.use('/.netlify/functions/index',router)

module.exports=app;
module.exports.handler=serverless(app)