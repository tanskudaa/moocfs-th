import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.new_anecdote.value))
    event.target.new_anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="new_anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteFrom