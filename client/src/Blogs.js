import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const getBlogs = () => {
      axios.get('http://localhost:8001/blogs')
          .then((response) => {
              console.log(response)
              setBlogs(response.data)
          }
          ).catch((err) => { console.log(err) })
  }
  useEffect(() => {
      getBlogs()
  }, [])
  return (
    <div>
      {blogs?.map((x) => {
                return (
                    <div className="card">
                        <div className="card-body">
                            <img src={x.myFile} alt='' className='upload-img'/>
                            <video width="200" height="100" controls>
          <source src={x.myVideoFile} type="video/mp4" />
        </video>
                            <h5 className="card-title">{x.title}</h5>
                            <p className="card-text">{x.description}</p>
                        </div>
                    </div>
                )
            })}
    </div>
  )
}

export default Blogs