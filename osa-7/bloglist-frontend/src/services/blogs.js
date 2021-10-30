import axios from 'axios'
const baseUrl = '/api/blogs'

const getAuthorizedHeaders = token => {
  return {
    headers: {
      Authorization: 'bearer ' + token
    }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog, token) => {
  const config = getAuthorizedHeaders(token)
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const remove = (blog, token) => {
  const config = getAuthorizedHeaders(token)
  const request = axios.delete(baseUrl + '/' + blog.id, config)
  return request.then(response => response.data)
}

const like = (blog) => {
  const modifiedBlog = { ...blog, likes: blog.likes + 1 }
  const request = axios.put(baseUrl + '/' + blog.id, modifiedBlog)
  return request.then(response => response.data)
}

const comment = (blog, message) => {
  const request = axios.post(`${baseUrl}/${blog.id}/comment`, { comment: message })
  return request.then(response => response.data)
}

export default { getAll, create, remove, like, comment }