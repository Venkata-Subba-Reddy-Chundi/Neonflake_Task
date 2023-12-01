import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ShowVideo() {
    const { id } = useParams()
    const [blogs, setBlogs] = useState([])
    const fetchData = async () => {
        axios.get(`http://localhost:8001/blogs/${id}`)
            .then((response) => {
                console.log(response);
                setBlogs([...blogs,response.data])
            }).catch((err) => { console.log(err) })
    }
    console.log(blogs)
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            { console.log(blogs,"hi ")}
            {
           
            blogs?.map((x) => {
                return (
                    <div>
                        <video width="400" height="400" controls autoPlay>
                            <source src={x.myVideoFile} type="video/mp4" />
                        </video>
                    </div>
                )
            })
            
            }
        </div>
    )
}

export default ShowVideo