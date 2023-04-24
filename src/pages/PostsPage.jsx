import { useEffect, useState } from "react"
import "./postspage.css"
import "./animations.scss"
import "./postspage-navbar.css"
import { useNavigate } from "react-router-dom"
import { Link, Outlet } from "react-router-dom"
import SearchBar from "../components/SearchBar.jsx"


const PostsPage = ({displayedPosts, setDisplayedPosts, displayDateDiff, handleSearch}) => {
    const navigate = useNavigate()

    const [useHeightCSS, setUseHeightCSS] = useState(false)
    
    useEffect(() => {
        if(document.body.clientHeight > 937)
        {
            setUseHeightCSS(true)
        }
        else
        {
            setUseHeightCSS(false)
        }

    }, [document.body.clientHeight])

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
        <div className="posts-page" style={useHeightCSS? {height: 'max-content'} : {height: '100vh'}}>
            <div className="navi-box">
                <div className="posts-homelink">
                    <Link to={"/"}>Home</Link>
                </div>
                <div className="posts-createlink">
                    <Link to={"/createpost"}>Create Post</Link>
                </div>
                <SearchBar handleSearch={handleSearch}/>
                <button className="posts-datesort" onClick={orderByDate}>Newest</button>
                <button className="posts-upvotessort" onClick={orderByUpvotes}>Most Popular</button>
            </div>

            <div className="posts-container">
                {displayedPosts &&
                    displayedPosts.map((post) => {
                        return(
                            <div className="post" onClick={() => {navigate(`/post/${post.id}`)}}>
                                <p className="post-date">{displayDateDiff(post.created_at)}</p>
                                <h1 className="post-title">{post.title}</h1>
                                <p className="post-upvotes">{post.upvotes} praises</p>
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostsPage