import { useEffect, useState } from "react"
import "./postspage.css"
import { useNavigate } from "react-router-dom"

const PostsPage = ({displayedPosts, setDisplayedPosts, displayDateDiff}) => {
    const navigate = useNavigate()
    
    const orderByDate = () => {
        const newlySortedPosts = 
            [...displayedPosts].sort((post1, post2) => {
                const date1 = new Date(post1.created_at)
                const date2 = new Date(post2.created_at)

                return date2.getTime() - date1.getTime()
            })

        setDisplayedPosts(newlySortedPosts)
    }

    const orderByUpvotes = () => {
        const newlySortedPosts =
            [...displayedPosts].sort((post1, post2) => {
                return post2.upvotes - post1.upvotes
            })
        
        setDisplayedPosts(newlySortedPosts)
    }

    return(
        <div className="posts-page">
            <div className="ordering-box">
                <button onClick={orderByDate}>Newest</button>
                <button onClick={orderByUpvotes}>Most Popular</button>
            </div>

            <div className="posts-container">
                {displayedPosts &&
                    displayedPosts.map((post) => {
                        return(
                            <div className="post" onClick={() => {navigate(`/post/${post.id}`)}}>
                                <p className="post-date">{displayDateDiff(post.created_at)}</p>
                                <h1>{post.title}</h1>
                                <p className="post-upvotes">{post.upvotes} upvotes</p>
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostsPage