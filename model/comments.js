const mongoose = require("mongoose")


const commentsSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comments",commentsSchema)