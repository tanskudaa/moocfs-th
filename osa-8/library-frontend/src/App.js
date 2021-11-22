import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const apollo = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) setToken(storedToken)
    apollo.resetStore()
  })

  const logoutUser = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logoutUser}>log out</button>
          </>
        )}
        {!token && (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
