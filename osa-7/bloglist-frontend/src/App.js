import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import AllBlogs from './components/AllBlogs'
import AllUsers from './components/AllUsers'
import UserInfo from './components/UserInfo'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'
import { createNotification } from './reducers/notificationReducer'
import Menu from './components/Menu'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) dispatch(setUser(JSON.parse(loggedUser)))

    dispatch(initializeBlogs())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(resetUser())
    dispatch(createNotification('Logged out'))
    history.push('/')
  }

  return (
    <div>
      { user && <Menu handleLogout={handleLogout} /> }
      <h2>Blogs app</h2>
      <Notification />

      <Switch>
        <Route exact path="/" >
          { !user ? <LoginForm /> : <AllBlogs /> }
        </Route>

        <Route path="/blog/:id" >
          <Blog />
        </Route>

        <Route path="/users/:id" >
          <UserInfo />
        </Route>

        <Route path="/users" >
          <AllUsers />
        </Route>

        <Route> {/* 404 */}
          <div>404 not found</div>
          {/* or:                 */}
          {/* <Redirect to="/" /> */}
        </Route>
      </Switch>
    </div>
  )
}

export default App