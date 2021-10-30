import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
          .map(blog => (
            <div key={blog.id}>
              <Link to={`/blog/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </div>
          ))
      }
    </div>
  )
}

export default AllBlogs