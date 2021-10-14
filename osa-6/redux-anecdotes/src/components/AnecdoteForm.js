import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote.value
    dispatch(createAnecdote(content))
    dispatch(createNotification(`Created "${content}"`))
    event.target.new_anecdote.value = ''
  }

  return (
    <div style={{ margin: '10px 10px 30px' }}>
      <p>Create new</p>
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