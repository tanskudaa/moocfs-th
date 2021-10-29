import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const notificationRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))

    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
    notificationRef.current.displayNotification('Logged out')
  }

  const handlePostBlog = (newBlog) => {
    const request = blogService.create(newBlog, user.token)
    // TODO No error handling
    request.then(response => {
      setBlogs(blogs.concat(response))
      notificationRef.current.displayNotification(
        `New blog ${response.name} by ${response.author} added`
      )
    })
  }

  const handleDeleteBlog = (blog) => {
    const request = blogService.remove(blog, user.token)
    request.then(response => setBlogs(blogs.filter(a => a.id !== response.id)))
  }

  const handleLikeBlog = (blog) => {
    const request = blogService.like(blog)
    request.then(response => setBlogs(
      blogs
        .filter(blog => blog.id !== response.id)
        .concat(response)
    ))
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification ref={notificationRef}/>
      {
        user === null
          ? (
            <>
              <LoginForm
                setUser={setUser}
                displayError={message => notificationRef.current.displayError(message)}
                clearNotifications={() => notificationRef.current.clearNotifications()}
              />
            </>
          )
          : (
            <>
              <h2>Blogs app</h2>
              <div>
                Logged in as {user.name}
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div>
                <NewBlogForm handlePostBlog={handlePostBlog}/>
                <h3>All blogs</h3>
                {blogs
                  .sort((e1, e2) => e2.likes - e1.likes)
                  .map(blog => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                      handleDeleteBlog={handleDeleteBlog}
                      handleLikeBlog={handleLikeBlog}
                    />)
                  )
                }
              </div>
            </>
          )
      }
    </div>
  )
}

export default App