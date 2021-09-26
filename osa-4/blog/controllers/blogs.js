require('express-async-errors')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const log = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs.map(a => a.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog.toJSON())
})

blogsRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.body.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...req.body, user })

  const result = await blog.save()
  res.status(201).json(result)
})

// TODO Update to token
blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id)
  res.json(blog.toJSON())
})

// TODO Update to token
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter