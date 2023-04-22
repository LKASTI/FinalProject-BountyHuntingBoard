import { useState, useEffect } from 'react'
import { useRoutes,  } from "react-router-dom"
import { supabase } from './client.js'
import Header from "./components/Header.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import EditPost from "./pages/EditPost.jsx"
import PostsPage from "./pages/PostsPage.jsx"
import PostView from "./pages/PostView.jsx"
import './App.css'

function App() {
  const [posts, setPosts] = useState()
  const [displayedPosts, setDisplayedPosts] = useState()
  
  const currDate = new Date()

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true })
      
      // console.log(data)

      setPosts(data)
      setDisplayedPosts(data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setDisplayedPosts(posts)
    // console.log(posts)
  }, [posts])

  
  const handleSearch = (searchVal) => {

    if(searchVal === "" || searchVal === " ")
    {
      setDisplayedPosts(posts)
    }
    else
    {
      setDisplayedPosts(posts.filter((post) => post.title.toLowerCase().includes(searchVal.toLowerCase())))
    }
  }


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
        return `Posted ${monthDiff} month(s) ago`
    else 
    if(dayDiff > 0)
        return `Posted ${dayDiff} day(s) ago`
    else
        return `Posted ${hourDiff} hour(s) ago`
  }

  let element = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <PostsPage handleSearch={handleSearch} displayDateDiff={displayDateDiff} setDisplayedPosts={setDisplayedPosts} displayedPosts={displayedPosts}/>
        },
        {
          path: "/createpost",
          element: <CreatePost posts={posts}/>
        },
        {
          path: "/editpost/:id",
          element: <EditPost posts={posts}/>
        },
        {
          path: "/post/:id",
          element: <PostView displayDateDiff={displayDateDiff} posts={posts} setPosts={setPosts}/>
        },
      ]
    }
  ])

  return (
    <>
      <div className='sidebar-left'/>
      <div className='sidebar-right'/>

      <div className="App">
        {element}
      </div>
    </>
  )
}

export default App
