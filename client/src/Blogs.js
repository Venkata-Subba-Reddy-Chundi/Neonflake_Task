import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Blogs() {
    const [blogs, setBlogs] = useState([])
    const getBlogs = () => {
        axios.get('https://neonflake-74ej.onrender.com/blogs')
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
                           <Link to={`/showvideo/${x._id}`}> 
                           <img src={x.myFile} alt='' className='upload-img' />
                           </Link>
                            {/* <video width="200" height="100" controls>
                                <source src={x.myVideoFile} type="video/mp4" />
                            </video> */}
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