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
  // const [searchVal, setSearchVal] = useState()
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {data} = await supabase
  //       .from('Posts')
  //       .select()
  //       .order('created_at', { ascending: true })
      
  //     setPosts(data)
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    setPosts([
      {
        "id": 65,
        "created_at": "2023-04-10 04:45:54.471979+00",
        "title": "Which is better? American Revolution or French Revolution?",
        "content": "",
        "image": "",
        "upvotes": 3,
        "comments": [
          "America!!!"
        ]
      },
      {
        "id": 73,
        "created_at": "2023-04-10 09:20:57.187388+00",
        "title": "I'm obsessed with the Holy Roman Empire",
        "content": "It's holy, Roman, and an empire",
        "image": "",
        "upvotes": 23,
        "comments": "[\"Very true\", \"Haha!]"
      },
      {
        "id": 87,
        "created_at": "2023-04-14 23:53:31.127016+00",
        "title": "Who is your favorite Founding Father?",
        "content": "Mine is Thomas Jefferson! What about you?",
        "image": "https://i.imgur.com/0QpthJU.jpg",
        "upvotes": 3,
        "comments": [
          "It's gotta be George Washington!",
          "Did you forget about Ben Franklin?"
        ]
      },
      {
        "id": 59,
        "created_at": "2023-04-08 01:19:55.739826+00",
        "title": "I love history!",
        "content": "",
        "image": "https://i.imgur.com/wzk9rEB.jpg",
        "upvotes": 2,
        "comments": [
          
        ]
      }
    ])

    setDisplayedPosts([
      {
        "id": 65,
        "created_at": "2023-04-10 04:45:54.471979+00",
        "title": "Which is better? American Revolution or French Revolution?",
        "content": "",
        "image": "",
        "upvotes": 3,
        "comments": [
          "America!!!"
        ]
      },
      {
        "id": 73,
        "created_at": "2023-04-10 09:20:57.187388+00",
        "title": "I'm obsessed with the Holy Roman Empire",
        "content": "It's holy, Roman, and an empire",
        "image": "",
        "upvotes": 23,
        "comments": "[\"Very true\", \"Haha!]"
      },
      {
        "id": 87,
        "created_at": "2023-04-14 23:53:31.127016+00",
        "title": "Who is your favorite Founding Father?",
        "content": "Mine is Thomas Jefferson! What about you?",
        "image": "https://i.imgur.com/0QpthJU.jpg",
        "upvotes": 3,
        "comments": [
          "It's gotta be George Washington!",
          "Did you forget about Ben Franklin?"
        ]
      },
      {
        "id": 59,
        "created_at": "2023-04-08 01:19:55.739826+00",
        "title": "I love history!",
        "content": "",
        "image": "https://i.imgur.com/wzk9rEB.jpg",
        "upvotes": 2,
        "comments": [
          
        ]
      }
    ])
  }, [])



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
          path: "/post/id:",
          element: <PostView posts={posts}/>
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
