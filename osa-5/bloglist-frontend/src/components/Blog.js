import React, { useState } from 'react'

const Blog = ({ blog, user, handleDeleteBlog, handleLikeBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const handleRemove = (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Really delete ${blog.name} by ${blog.author}?`)
    if (confirmed) handleDeleteBlog(blog)
  }

  const handleLike = (event) => {
    event.preventDefault()
    handleLikeBlog(blog)
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