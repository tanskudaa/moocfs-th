import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter    = useSelector(state => state.filter)
  const dispatch  = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const content = anecdotes
      .filter(a => a.id === id)[0]
      .content
    dispatch(createNotificationWithTimeout(`Voted "${content}"`, dispatch))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => (b.votes - a.votes))
        .filter(a => a
          .content
          .toLowerCase()
          .includes(filter.toLowerCase()))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList