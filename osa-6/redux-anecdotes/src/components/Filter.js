import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <div style={{ margin: '10px 10px 30px' }}>
      <p>Filter anecdotes:</p>
      <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }
export default connect(null, mapDispatchToProps)(Filter)