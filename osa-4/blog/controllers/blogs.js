const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => res.json(blogs.map(a => a.toJSON())))
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

module.exports = blogsRouter