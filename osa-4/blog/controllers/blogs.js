require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  if (typeof req.user !== 'undefined') {
    const blog = new Blog({ ...req.body, user: req.user })

    const result = await blog.save()

    req.user.blogs.push(result.id)
    await User.findByIdAndUpdate(req.user.id, { blogs: req.user.blogs })

    res.status(201).json(result)
  }
  else {
    res.status(401).json({ error: 'invalid token' })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (typeof req.user !== 'undefined' && req.user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blog.id)
    await User.findByIdAndUpdate(
      req.user.id,
      { blogs: req.user.blogs.filter(a => a.toString() !== blog.id.toString()) }
    )

    res.json(blog.toJSON())
  }
  else {
    res.status(401).json({ error: 'invalid token' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  /*
   * NOTE Anyone can PUT anything into any blog if they know the blog ID.
   * But that's how the exercise goes, so whatever.
   */
  // const blog = await Blog.findById(req.params.id)
  // if (typeof req.user !== 'undefined' && req.user.id.toString() === blog.user.toString()) {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  res.status(201).json(updatedBlog.toJSON())
  // }
  // else {
  //   res.status(401).json({ error: 'invalid token' })
  // }
})

module.exports = blogsRouter