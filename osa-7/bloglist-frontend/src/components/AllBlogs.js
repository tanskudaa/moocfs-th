import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const AllBlogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <NewBlogForm />
      <h3>All blogs</h3>
      {
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => (<Blog key={blog.id} blog={blog} />))
      }
    </div>
  )
}

export default AllBlogs