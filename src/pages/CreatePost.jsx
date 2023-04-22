import { supabase } from "../client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./createpost.css"
import GO_BACK_ICON from "../assets/images/go_back_icon.png"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const handleCreatePost = async (e) => {
        e.preventDefault()

        const post = {title: `${title}`, content: `${content}`, image: `${image}`, comments: [], upvotes: 0}

        // console.log(post.title)

        if(post.title === "" || post.content === "")
        {
            alert("Please fill the title and content fields")
            return
        }

        await supabase
            .from("Posts")
            .insert(post)
            .select()

        window.location = "/"
    }

    const handleGoBack = () => {
        window.location = "/"
    }

    const handleTitle = (e) => {

        setTitle(e.target.value)
    }

    return(
        <div className="createpost-page">
            <form onSubmit={handleCreatePost} className="createpost-form">
                <input className="createpost-title" 
                    placeholder="Title"
                    value={title}
                    onChange={handleTitle}
                />
                <textarea className="createpost-content" 
                    placeholder="Content"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
                <input className="createpost-imageurl" 
                    placeholder="Image URL (Optional)"
                    value={image}
                    onChange={(e) => {setImage(e.target.value)}}
                />
                <button className="createpost-submitbutton" type="submit">Create</button>
            </form>
            <img onClick={handleGoBack} className="goback-button" src={GO_BACK_ICON} />
        </div>
    )
}

export default CreatePost