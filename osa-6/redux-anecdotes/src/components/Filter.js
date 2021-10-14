import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={{ margin: '10px 10px 30px' }}>
      <p>Filter anecdotes:</p>
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter