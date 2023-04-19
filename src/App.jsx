import { useState, useEffect } from 'react'
import { useRoutes,  } from "react-router-dom"
import { supabase } from './client.js'
import NavBar from "./components/NavBar.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import EditPost from "./pages/EditPost.jsx"
import PostsPage from "./pages/PostsPage.jsx"
import PostView from "./pages/PostView.jsx"
import './App.css'

function App() {
  const [posts, setPosts] = useState()
  const [displayedPosts, setDisplayedPosts] = useState()
  
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

  let element = useRoutes([
    {
      path: "/",
      element: <NavBar handleSearch={handleSearch}/>,
      children: [
        {
          path: "/",
          element: <PostsPage displayedPosts={displayedPosts}/>
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
          element: <PostView posts={posts} setPosts={setPosts}/>
        },
      ]
    }
  ])

  return (
    <div className="App">
      {element}
    </div>
  )
}

export default App
