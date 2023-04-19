import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../client"
import "./editpost.css"

const EditPost = ({posts}) => {
    const {id} = useParams()
    
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [image, setImage] = useState()

    const [post, setPost] = useState()


    useEffect(() => {
        const temp = posts.filter((post) => post.id === parseInt(id))
        setPost(temp[0])
        
        setTitle(temp[0].title)
        setContent(temp[0].content)
        setImage(temp[0].image)

        // console.log(temp[0])

    }, [])

    const handleEditPost = async (e) => {
        e.preventDefault()

        const newPost = {...post, title: title, content: content, image: image}
        // console.log(newPost)

        if(newPost.title === "" || newPost.content === "")
        {
            alert("Please fill the title and content fields")
            return
        }

        await supabase
            .from("Posts")
            .update(newPost)
            .eq('id', id)

        window.location = "/"
    }

    return(
        <div className="editpost-page">
            <form onSubmit={handleEditPost} className="editpost-form">
                <input className="editpost-title" 
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <textarea className="editpost-content" 
                    placeholder="Content"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
                <input className="editpost-imageurl" 
                    placeholder="Image URL (Optional)"
                    value={image}
                    onChange={(e) => {setImage(e.target.value)}}
                />
                <button className="editpost-submitbutton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditPost