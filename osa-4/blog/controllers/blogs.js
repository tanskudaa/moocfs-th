const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(a => a.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog.toJSON())
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id)
  res.json(blog.toJSON())
})

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