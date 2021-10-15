import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.voteAnecdote(id)
    const content = props.anecdotes.filter(a => a.id === id)[0].content
    props.createNotification(`Voted "${content}"`)
  }

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => (b.votes - a.votes))
        .filter(a => a
          .content
          .toLowerCase()
          .includes(props.filter.toLowerCase()))
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

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})

const mapDispatchToProps = {
  voteAnecdote, createNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)