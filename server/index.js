require("dotenv").config()
const blogModel = require('./blogModel')
const express = require('express');
const bp=require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const cloudinary = require('./cloudinary/cloudinary')
const multer = require('./multer')

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
// app.use(bp.urlencoded(({extended:true})))

app.get('/', (req, res) => {
  res.send("Welcome to server")
  console.log("hi")
})
// app.post('/addimage', async(req, res) => {
//     const { image } = req.body;

//     const uploadedImage=await cloudinary.uploader.upload(image, {
//         upload_preset:"unsigned_preset",
//         allowed_formats:['jpg','jpeg','png','svg']
//     },
//     function (error, result) { 
//         if(error){
//             console.log(error)
//         }
//         console.log(result)    
//      });
//      try{res.status(200).json(uploadedImage)}catch(err){console.log(err)}
// })
app.post('/addimage', multer.single('image'), function (req, res) {
  console.log(req)
  cloudinary.uploader.upload(req.body.imagedata,
    {
      upload_preset: "unsigned_preset",
      allowed_formats: ['jpg', 'jpeg', 'png', 'svg']
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }

      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result
      })
    })
});
// app.post('/addvideo', async(req, res) => {
//     const { video } = req.body;

//     const uploadedVideo=await cloudinary.uploader.upload(video, {
//         upload_preset:"video_preset",
//         allowed_formats:['mp4','webm','ogg']
//     },
//     function (error, result) { 
//         if(error){
//             console.log(error)
//         }
//         console.log(result)    
//      });
//      try{res.status(200).json(uploadedVideo)}catch(err){console.log(err)}
// })
app.post('/addvideo', multer.single('video'), function (req, res) {
  cloudinary.uploader.upload(req.body.videodata,
    {
      resource_type: 'video',
      upload_preset: "video_preset",
      allowed_formats: ['mp4', 'webm', 'ogg']
    },
    function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result
    })
  })
});

const DB_URL = process.env.MONGO_URL
mongoose.connect(DB_URL).then((db, err) => {
  try {
    // app.listen(port,()=>{console.log("Server Started")})
    console.log("Server Connected")
  } catch (err) { console.log(err) }
})

//Data Operations------------------------
//get api
app.get('/blogs', async (req, res) => {
  let blogs = await blogModel.find();
  try {
    if (!blogs) {
      res.status(400).json({ message: "Data Not Found" })
    } else {
      res.status(200).send(blogs)
      console.log(blogs)
    }
  }
  catch (e) { console.log(e) }
})
//get api id
app.get('/blogs/:id', async (req, res) => {
  const { id } = req.params
  try {
    let blogs = await blogModel.findById(id);
    if (!blogs) {
      res.status(400).json({ message: "Data Not Found" })
    } else {
      res.status(200).send(blogs)
      console.log(blogs)
    }
  }
  catch (e) { console.log(e) }
})
// post api
app.post('/createBlog', async (req, res) => {
  try {
    const { title, description, myFile } = req.body
    await blogModel.create(req.body)
    return res.status(200).json({ message: "Blog Posted" })
  } catch (e) { console.log(e) }
})
//delete api
app.delete('/:id', async (req, res) => {
  let studentID = await blogModel.findById(req.params.id)
  if (!studentID) {
    res.status(400).json({ message: "User not Found" })
  } else {
    try {
      await blogModel.findByIdAndDelete(req.params.id)
      return res.status(200).json({ message: "Blog Deleted" })
    } catch (e) { console.log(e) }
  }
})
//update api
app.patch('/editblog/:id', async (req, res) => {
  try {
    await blogModel.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200).json({ message: "Blog Updated" })
  } catch (e) { console.log(e) }
})

app.listen(port, () => { console.log("Server Started") })

