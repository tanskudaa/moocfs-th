const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  /*
  Blog.find({})
    .then(blogs => res.json(blogs.map(a => a.toJSON())))
  */
  const blogs = await Blog.find({})
  res.json(blogs.map(a => a.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  /*
  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
  */
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter