import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_ANECDOTE':
      return [ ...state, action.data ]

    case 'UPDATE_ANECDOTE':
      return [
        ...state.filter(a => a.id !== action.data.id),
        action.data
      ]

    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getById(id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const result = await anecdoteService.update(id, updatedAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: result
    })
  }
}

export default anecdoteReducer