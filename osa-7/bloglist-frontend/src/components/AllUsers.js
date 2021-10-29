import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const AllUsers = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(response => setUsers(response))
  }, [])

  return (
    <div>
      <h3>Users</h3>
      {users.map(a => (
        <div key={a.id}>
          <a href={`/users/${a.id}`}> {a.name} </a>
          blogs {a.blogs.length}
        </div>
      ))}
    </div>
  )
}

export default AllUsers