import React, { useState } from 'react'

const Blog = ({ blog, user, handleDeleteBlog, handleLikeBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const handleRemove = (event) => {
    event.preventDefault()
    handleDeleteBlog(blog)
  }

  const handleLike = (event) => {
    event.preventDefault()
    handleLikeBlog(blog)
  }

  return (
    <div>
      <i>{blog.title}</i> {blog.author}
      <button onClick={() => setShowMore(!showMore)}>View</button>
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
            <button onClick={handleLike}>Like</button>
          </li>
          <li>{blog.author}</li>
          {
            blog.user.username === user.username
              ? <li><button onClick={handleRemove}>Delete blog</button></li>
              : null
          }
        </ul>

        : null
      }
    </div>
  )
}

export default Blog