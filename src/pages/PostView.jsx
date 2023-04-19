import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import "./postview.css"

const PostView = ({posts, setPosts}) => {
    const [post, setPost] = useState()
    const [comment, setComment] = useState()

    const {id} = useParams()

    const navigate = useNavigate()
   
    useEffect(() => {

        const fetchPost = async () => {
            const {data} = 
                await supabase
                    .from("Posts")
                    .select()
                    .eq('id', id)

            setPost(posts? data[0] : null)
        }  

        fetchPost()

        
    }, [posts])

    useEffect(() => {
        const updatePost = async () => {
            await supabase
                .from("Posts")
                .update(post)
                .eq('id', id)
        }

        updatePost()

    }, [post])

    const handleDeletePost = async () => {
        await supabase
            .from("Posts")
            .delete()
            .eq('id', id)

        window.location = "/"
    } 

    const handleUpvote = async () => {

        const newUpvotes = post.upvotes+1

        await supabase
            .from("Posts")
            .update({upvotes: newUpvotes})
            .eq('id', id)

        setPost({...post, upvotes: newUpvotes})


        setPosts((posts.map((post) => {
            if(post.id === parseInt(id))
            {
                post.upvotes = newUpvotes
            }
            return post
        })))
    }



    const handleCommmentSubmission = async (e) => {
        e.preventDefault()

        const newPost = {...post, comments: [...post.comments, comment]}

        setPost(newPost)
        setComment("")
    }

    return(
        <div className="post-view-page">
            {post && 
                <div className="post-view">
                    <div className="post-view-content">
                        <p className="post-view-date">{post.created_at}</p>
                        <h1 className="post-view-title">{post.title}</h1>
                        <p className="post-view-content">{post.content}</p>
                        <img referrerPolicy="no-referrer" src={post.image} className="post-view-img"/>
                        <div className="post-view-editables">
                            <div className="post-view-upvotes">
                                <button onClick={handleUpvote}>upvote</button>
                                <p >{post.upvotes}</p>
                            </div>
                            <div className="post-view-buttons">
                                <button onClick={() => {navigate(`/editpost/${post.id}`)}} className="post-view-editbutton">Edit Post</button>
                                <button onClick={handleDeletePost}  className="post-view-deletebutton">Delete Post</button>
                            </div>
                        </div>
                    </div>
                    <div className="comments-box">
                        {post.comments.length > 0? post.comments.map((comment) => {
                            return(<p>- {comment}</p>)
                        }): ""}
                        <form onSubmit={handleCommmentSubmission}>
                            <input
                                placeholder="Enter a Comment"
                                value={comment}
                                onChange={(e) => {setComment(e.target.value)}}
                            />
                            <button className="" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostView