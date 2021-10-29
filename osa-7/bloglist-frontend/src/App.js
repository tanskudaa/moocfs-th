import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) dispatch(setUser(JSON.parse(loggedUser)))

    dispatch(initializeBlogs())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(resetUser())
    dispatch(createNotification('Logged out'))
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification />
      {
        user === null
          ? (
            <>
              <LoginForm />
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
                <NewBlogForm />
                <h3>All blogs</h3>
                {blogs
                  .sort((e1, e2) => e2.likes - e1.likes)
                  .map(blog => (
                    <Blog
                      key={blog.id}
                      blog={blog}
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