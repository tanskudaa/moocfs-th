import React, { useState } from 'react'
import { Input } from './StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

const NewBlogForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [title,   setTitle  ] = useState('')
  const [author,  setAuthor ] = useState('')
  const [url,     setUrl    ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createBlog({ title, author, url }, user.token))
    dispatch(createNotification(`Created new blog "${title}" by ${author}`))
    setVisible(false)
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
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div>
                Author:
                <Input
                  id="author"
                  type="text"
                  name="author"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div>
                URL:
                <Input
                  id="url"
                  type="text"
                  name="url"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button className="new-blog-form__submit-button" type="submit">Post</button>
            </form>
          </>
        ) : null
      }

      <button className="new-blog-form__expand-button" onClick={() => setVisible(!visible)}>
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