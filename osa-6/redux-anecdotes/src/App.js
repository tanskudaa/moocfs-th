import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </>
  )
}

export default App