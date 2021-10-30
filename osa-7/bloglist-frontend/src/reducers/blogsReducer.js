import blogService from '../services/blogs'
const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'NEW_BLOG':
      return [ ...state, action.data ]

    case 'UPDATE_BLOG':
      return [
        ...state.filter(a => a.id !== action.data.id),
        action.data
      ]

    case 'DELETE_BLOG':
      return [ ...state.filter(a => a.id !== action.data.id) ]

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content, token) => {
  return async dispatch => {
    const blog = await blogService.create(content, token)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.like(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog, token) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(blog, token)
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const response = await blogService.comment(blog, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { ...blog, comments: blog.comments.concat(response.comment) }
    })
  }
}

export default blogsReducer