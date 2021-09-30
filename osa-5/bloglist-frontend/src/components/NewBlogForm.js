import React, { useState } from 'react'

const NewBlogForm = ({ handlePostBlog }) => {
  const [visible, setVisible] = useState(false)
  const [title,   setTitle  ] = useState('')
  const [author,  setAuthor ] = useState('')
  const [url,     setUrl    ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handlePostBlog({ title, author, url })
  }

  return (
    <div>
      { visible
        ? (
          <>
            <h4>Post new blog</h4>
            <form onSubmit={handleSubmit} >
              <div>
                Title:
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div>
                Author:
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div>
                URL:
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button type="submit">Post</button>
            </form>
          </>
        ) : null
      }

      <button onClick={() => setVisible(!visible)}>
        {
          visible
            ? 'Cancel'
            : 'Post new blog'
        }
      </button>
    </div>
  )
}

export default NewBlogForm