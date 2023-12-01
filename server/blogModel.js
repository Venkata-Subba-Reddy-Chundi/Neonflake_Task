const mongoose=require('mongoose')

const blogModel=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:[true,"give a title"]
    },
    description:{
        type:String,
        trim:true,
        required:[true,"Describe it"]
    },
    myFile:{
        type:String
    },
    myVideoFile:{
        type:String
    }
})
const blog= mongoose.model("Blogs",blogModel);

module.exports =blog;