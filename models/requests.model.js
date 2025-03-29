const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    state:{
        type:Boolean,
        required:true
    }
})

const request = mongoose.model("request", requestSchema)