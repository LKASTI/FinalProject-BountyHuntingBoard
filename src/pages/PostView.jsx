import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"
import GO_BACK_ICON from "../assets/images/go_back_icon.png"
import "./postview.css"
import "./animations.scss"

const PostView = ({posts, setPosts, displayDateDiff}) => {
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

        //update database
        await supabase
            .from("Posts")
            .update({upvotes: newUpvotes})
            .eq('id', id)

        //update post in postview page
        setPost({...post, upvotes: newUpvotes})


        //update post in posts page
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
                        <div className="post-view-date_description">
                            <p className="post-view-date">{displayDateDiff(post.created_at)}</p>
                            <div className="post-view-description">{post.content}</div>
                        </div>
                        <div className="post-view-title_image">
                            <h1 className="post-view-title">{post.title}</h1>
                            <img className="post-view-img" referrerPolicy="no-referrer" src={post.image} />
                        </div>
                        <div className="post-view-clickables">
                            <div className="post-view-upvotes">
                                <button onClick={handleUpvote}>praise</button>
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
            <img className="goback-button" src={GO_BACK_ICON} onClick={() => {window.location = "/"}}/>
        </div>
    )
}

export default PostView