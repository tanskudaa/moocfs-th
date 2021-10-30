import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const [ blog, setBlog ] = useState(null)
  const [ newComment, setNewComment ] = useState('')

  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()

  const styleList = {
    listStyleType: 'none',
    padding: 0
  }

  useEffect(() => {
    setBlog(blogs.find(b => b.id.toString() === id.toString()))
  }, [blogs])

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

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, newComment))
    setNewComment('')
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
        <li>
          <h3>Comments</h3>
          { blog.comments.length > 0

            ?
            <ul>
              { blog.comments.map((comment, i) => (
                <li key={`${blog.id}-comment-${i}`}>
                  {comment}
                </li>
              ))}
            </ul>

            :
            <div>No comments. Be the first one to comment!</div>
          }
          <form onSubmit={handleNewComment}>
            <div>
              Comment
              <input
                type="text"
                value={newComment}
                onChange={({ target }) => setNewComment(target.value)}
              />
              <button type="submit">Post</button>
            </div>
          </form>
        </li>
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