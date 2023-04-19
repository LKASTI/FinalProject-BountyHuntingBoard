import { useEffect, useState } from "react"
import "./postspage.css"
import { useNavigate } from "react-router-dom"

const PostsPage = ({displayedPosts}) => {
    const navigate = useNavigate()
    const currDate = new Date()

    const [orderedPosts, setOrderedPosts] = useState()

    useEffect(() => {
        setOrderedPosts(displayedPosts)

    }, [displayedPosts])

    const displayDateDiff = (creation_date) => {
        const postMonth = parseInt(creation_date.substring(5, 8))
        const postDay = parseInt(creation_date.substring(8, 11))
        const postHour = parseInt(creation_date.substring(11, 14)) - 5

        const currMonth = currDate.getMonth()
        const currDay = currDate.getDate()
        const currHour = currDate.getHours()

        const monthDiff = currMonth - postMonth
        const dayDiff = currDay - postDay
        const hourDiff = currHour - postHour

        if(monthDiff > 0)
            return `Created ${monthDiff} month(s) ago`
        else 
        if(dayDiff > 0)
            return `Created ${dayDiff} day(s) ago`
        else
            return `Created ${hourDiff} hour(s) ago`
    }

    const orderByDate = () => {
        setOrderedPosts(
            orderedPosts.sort((post1, post2) => {
                const date1 = new Date(post1.created_at)
                const date2 = new Date(post2.created_at)

                return date1.getTime() - date2.getTime()
            })
        )
    }


    const orderByUpvotes = () => {
        setOrderedPosts(
            orderedPosts.sort((post1, post2) => {
                return post1.upvotes - post2.upvotes
            })
        )
    }

    return(
        <div className="posts-page">
            <div className="ordering-box">
                <button onClick={orderByDate}>Newest</button>
                <button onClick={orderByUpvotes}>Most Popular</button>
            </div>

            <div className="posts-container">
                {orderedPosts &&
                    orderedPosts.map((post) => {
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