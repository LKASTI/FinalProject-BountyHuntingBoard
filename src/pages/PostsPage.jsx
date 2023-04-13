import "./postspage.css"

const PostsPage = ({displayedPosts}) => {


    return(
        <div className="posts-page">
            <div className="ordering-box">

            </div>

            <div className="posts-container">
                {displayedPosts &&
                    displayedPosts.map((post) => {
                        return(
                            <div className="post">
                                <p className="post-date">{post.created_at}</p>
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