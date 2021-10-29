import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import userService from '../services/users'

const UserInfo = () => {
  const [ userToShow, setUserToShow ] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService
      .getAll()
      .then(response => {
        setUserToShow(response.find(a =>
          a.id.toString() === id.toString()
        ))
      })
  }, [id])

  if (userToShow) return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {
          userToShow.blogs.map(b => (
            <li key={b.id}>{b.title} by {b.author}</li>
          ))
        }
      </ul>
    </div>
  )
  else return (
    <div> User not found </div>
  )
}

export default UserInfo