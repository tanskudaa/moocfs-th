import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const Blog = () => {
  const user = useSelector(state => state.user)
  const [ blog, setBlog ] = useState(null)
  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        setBlog(response.find(b =>
          b.id.toString() === id.toString()
        ))
      })
  }, [id, blog])

  const styleList = {
    listStyleType: 'none',
    padding: 0
  }

  const handleRemove = (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Really delete ${blog.name} by ${blog.author}?`)
    if (confirmed) {
      dispatch(deleteBlog(blog, user.token))
      dispatch(createNotification(`Deleted blog "${blog.title}"`))
      history.goBack()
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  if (blog) return (
    <div className='blog'>
      <h2>{blog.title} by {blog.author}</h2>
      <ul style={styleList}>
        <li>
          <a
            href={blog.url}
            rel="noreferrer"
            target="_blank">
            {blog.url}
          </a>
        </li>
        <li>
          Likes {blog.likes}
          <button className="blog__like-button" onClick={handleLike}>Like</button>
        </li>
        <li>Author: {blog.author}</li>
        <li>submitted by {blog.user.name}</li>
        {
          blog.user.username === user.username &&
          <li><button className="blog__delete-button" onClick={handleRemove}>Delete blog</button></li>
        }
      </ul>
    </div>
  )
  else return (
    <div className='blog'>
      {'This blog couldn\'t be found'}
    </div>
  )
}

export default Blog