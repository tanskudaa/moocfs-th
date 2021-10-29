import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [showMore, setShowMore] = useState(false)

  const handleRemove = (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Really delete ${blog.name} by ${blog.author}?`)
    if (confirmed) {
      dispatch(deleteBlog(blog, user.token))
      dispatch(createNotification(`Deleted blog "${blog.title}"`))
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  return (
    <div className='blog'>
      <i>{blog.title}</i> {blog.author}
      <button className="blog__expand-button" onClick={() => setShowMore(!showMore)}>View</button>
      { showMore === true

        ?
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <a
              href={blog.url}
              rel="noreferrer"
              target="_blank">
              {blog.url}
            </a>
          </li>
          <li>
            likes {blog.likes}
            <button className="blog__like-button" onClick={handleLike}>Like</button>
          </li>
          <li>{blog.author}</li>
          {
            blog.user.username === user.username
              ? <li><button className="blog__delete-button" onClick={handleRemove}>Delete blog</button></li>
              : null
          }
        </ul>

        : null
      }
    </div>
  )
}

export default Blog