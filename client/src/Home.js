import { useState } from 'react';
import axios from 'axios'
import './App.css';
import {useNavigate} from 'react-router-dom'

function App() {
  const [blogs, setBlogs] = useState({ title: '', description: '', myFile: '' , myVideoFile:''})
  const [imagefile, setImageFile] = useState("")
  const [image, setImage] = useState("")
  const [videoFile,setVideoFile]=useState("")
  const [video,setVideo]= useState("")
  const [showImgButton, setShowImgButton] = useState(false);
  const [showVidButton, setShowVidButton] = useState(false);
  const nav=useNavigate()

  const changeHandle = async (e) => {
    try {
      const obj = { ...blogs, [e.target.name]: e.target.value }
      setBlogs(obj)
    } catch (e) { console.log(e) }
  }

  const handleImgChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    setImageFile(file)
    previewFile(file)
  }

  function previewFile(imagefile) {
    const reader = new FileReader()
    reader.readAsDataURL(imagefile)
    reader.onloadend = () => {
      setImage(reader.result)
    }
    // console.log(image)
    setShowImgButton(true)
  }

  const ImgConvert = async () => {
    const result = await axios.post("https://neonflake-74ej.onrender.com/addimage", {
      imagedata: image
    })
    try {
      // console.log(result)
      const uploadedImage = await result.data.data.url
      // console.log(uploadedImage)
      setBlogs({...blogs,myFile: uploadedImage})
      console.log("Image Uploaded")
      
    } catch (err) { console.log(err) }
    setShowImgButton(false)
  }

  const handleVidChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    setVideoFile(file)
    previewVidFile(file)
  }

  function previewVidFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setVideo(reader.result)
    }
    // console.log(image)
    setShowVidButton(true)
  }
  const VidConvert = async () => {
    const result = await axios.post("https://neonflake-74ej.onrender.com/addvideo", {
      videodata:video
    })
    try {
      console.log(result)
      const uploadedVideo = await result.data.data.url
      console.log(uploadedVideo)
      setBlogs({...blogs,myVideoFile: uploadedVideo})
      console.log("Video Uploaded")
      
    } catch (err) { console.log(err) }
    setShowVidButton(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(blogs)
    await axios.post(`https://neonflake-74ej.onrender.com/createBlog`, blogs)
      .then((response) => {
        console.log(response)
        nav('/blogs')
      }).catch((err) => { console.log("axios error", err) })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label>Enter Title:</label><br />
        <input type='text' placeholder='Title' name="title"
          className="title " onChange={changeHandle} /><br />
        <label>Enter Description:</label><br />
        <textarea placeholder='Description' name='description'
          className="description form-control" onChange={changeHandle}></textarea><br />

        <label htmlFor="imgInput">Upload a Photo </label>
        <input type='file' onChange={handleImgChange} required name='myFile' id='imgInput'
          accept='image/jpg, image/jpeg, image/png' /><br/><br />
        {showImgButton && <button onClick={ImgConvert}>Confirm image upload </button>}  <br /><br />

        <label htmlFor="imgInput">Upload a Video </label>
        <input type='file' onChange={handleVidChange} required name='myFile' id='imgInput'
           accept="video/mp4, video/webm, video/ogg" /><br /><br />
        {showVidButton && <button onClick={VidConvert}>Confirm image upload</button>}  <br /><br />

        <button onClick={handleSubmit}>Submit</button><br />
      </form>
      <img src={image} alt='' className='upload-img' /><br />
      {video && (
        <video width="200" height="100" controls>
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default App;
