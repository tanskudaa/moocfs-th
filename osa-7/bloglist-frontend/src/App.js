import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AllBlogs from './components/AllBlogs'
import AllUsers from './components/AllUsers'
import UserInfo from './components/UserInfo'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, resetUser } from './reducers/userReducer'
import { createNotification } from './reducers/notificationReducer'

const App = () => {
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
      { user &&
        <div>
          Logged in as {user.name}
          <button onClick={handleLogout}>Logout</button>
        </div>
      }

      <Switch>
        <Route exact path="/" >
          { !user ? <LoginForm /> : <AllBlogs /> }
        </Route>

        <Route path="/users/:id" >
          <UserInfo />
        </Route>

        <Route path="/users" >
          <AllUsers />
        </Route>

        <Route> {/* 404 */}
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

export default App