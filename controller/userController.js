const express = require("express")
const router = express.Router()
const User = require("../model/User")
const Post = require("../model/post")
const Comments = require("../model/comments")


router.post("/create",async (req,res) => {

        const {name,userId}= req.body;
        const saveUser =  new User({
            name : name,
            userId:userId
        })
        const savedUser = await saveUser.save()
        res.send(savedUser)

})

router.get("/login",async (req,res) => {

    const {password,email}= req.body;
    const userExist = await User.find({email,password});
    // if(userExist) {

    // }
    res.send(userExist)

})

router.put("/:id/update",async (req,res) => {

    const id = req.params.id;
    const userExist = await User.findByIdAndUpdate(id,{
        $set : { "password" : "1234567"}
    });
    res.send(userExist)

})

router.delete("/:id/delete",async (req,res) => {

    const id = req.params.id;
    const userExist = await User.findByIdAndDelete(id);
    // if(userExist) {

    // }
    res.send(userExist)

})

router.post("/post",async (req,res) => {

    const {title,userId}= req.body;
    const saveUser =  new Post({
        title:title,
        userId:userId
    })
    const savedUser = await saveUser.save()
    res.send(savedUser)

})

router.post("/comment",async (req,res) => {

    const {title,userId}= req.body;
    const saveUser =  new Comments({
        title:title,
        userId:userId
    })
    const savedUser = await saveUser.save()
    res.send(savedUser)

})

router.post("/print",async (req,res) => {

    const userExist = await User.aggregate([
        {
            $lookup: {
               from: "comments",
               localField: "userId",
               foreignField: "userId",
               as: "comments"
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "userId",
                foreignField: "userId",
                as: "posts"
            }
        },

        {$project: {
            "_id":0,
            "name":1,
            "comments.title":1,
            "posts.title":1
            }
            } 
        ])
            return res.send(userExist)
})

module.exports=router