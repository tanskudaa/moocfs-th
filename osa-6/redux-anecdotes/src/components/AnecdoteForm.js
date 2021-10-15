import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteFrom = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote.value
    props.createAnecdote(content)
    props.createNotification(`Created "${content}"`)
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

const mapDispatchToProps = {
  createAnecdote,
  createNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteFrom)