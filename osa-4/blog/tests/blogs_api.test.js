const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUser = {
  _id: '6150b2577f55c34d291172e1',
  username: 'tiara',
  name: 'Belle',
  passwordHash: '$2b$10$oNLxwdGJ8I/N5Bqz/to3w.FojX08vETD5L6sLYcOJGkUlxhtkaGCe',
  blogs: [
    '5a422a851b54a676234d17f7',
    '5a422aa71b54a676234d17f8',
    '5a422aa71b54a676234d17f9',
    '5a422aa71b54a676234d17fa',
    '5a422aa71b54a676234d17fb',
    '5a422aa71b54a676234d17fc'
  ],
  __v: 0
}

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '6150b2577f55c34d291172e1',
    likes: 7, // Total 7
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '6150b2577f55c34d291172e1',
    likes: 5, // Total 12
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '6150b2577f55c34d291172e1',
    likes: 12, // Total 24, most likes
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '6150b2577f55c34d291172e1',
    likes: 10, // Total 34
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '6150b2577f55c34d291172e1',
    likes: 0, // Total 34
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '6150b2577f55c34d291172e1',
    likes: 2, // Total 36
    __v: 0
  }
]

const newBlog = {
  _id: '5a422bc61b54a676234d17fd',
  title: 'Type wars DUPLICATE',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}

const tokenString = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1WTSIsImlkIjoiNjE1MGIyNTc3ZjU1YzM0ZDI5MTE3MmUxIiwiaWF0IjoxNjMyNzU0NDcyfQ.Oqm6oJ_Ks9ZlbUwb4Z4qsNTQOp6_--mvtcYijCzzxFY'
const getResLength = (res) => res.body.length

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  await User.deleteMany({})
  await User.insertMany([initialUser])
})

describe('GET', () => {
  test('get blogs from api with status 200 and Content-Type application/json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id is the defining field of returned documents instead of _id', async () => {
    const res = await api.get('/api/blogs/')

    res.body.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
  })
})

describe('POST', () => {
  test('post new blog to api with status 201 and generated document', async () => {
    await api
      .post('/api/blogs')
      .set('authorization', tokenString)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('post request responds with sent document', async () => {
    const user = await User.findById(initialUser._id)
    user.blogs.push(newBlog._id)
    const expectedResponse = JSON.parse(JSON.stringify(new Blog({ ...newBlog, user })))

    const res = await api
      .post('/api/blogs')
      .set('authorization', tokenString)
      .send(newBlog)

    expect(res.body).toEqual(expectedResponse)
  })

  test('document count increments by one after post', async () => {
    const resBeforePost = await api.get('/api/blogs/')
    await api
      .post('/api/blogs/')
      .set('authorization', tokenString)
      .send(newBlog)
    const resAfterPost = await api.get('/api/blogs/')

    expect(getResLength(resAfterPost)).toEqual(getResLength(resBeforePost) + 1)
  })

  test('likes default to 0 if not submitted', async () => {
    const { likes, ...excludeLikes } = newBlog

    const res = await api
      .post('/api/blogs/')
      .set('authorization', tokenString)
      .send(excludeLikes)

    expect(res.body.likes).toBeDefined()
    expect(res.body.likes).toBe(0)
  })

  test('no title on submission returns 400', async () => {
    const { title, ...excludeTitle } = newBlog

    await api
      .post('/api/blogs/')
      .set('authorization', tokenString)
      .send(excludeTitle)
      .expect(400)
  })

  test('no url on submission returns 400', async () => {
    const { url, ...excludeUrl } = newBlog

    await api
      .post('/api/blogs/')
      .set('authorization', tokenString)
      .send(excludeUrl)
      .expect(400)
  })

  test('401 on no token', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('401 on invalid token', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', tokenString.replace('1', '2'))
      .expect(401)
  })
})

describe('DELETE', () => {
  test('delete responds with removed document', async () => {
    const expectedResponse = JSON.parse(JSON.stringify(new Blog(initialBlogs[0])))
    const res = await api
      .delete('/api/blogs/'+expectedResponse.id)
      .set('authorization', tokenString)

    expect(res.body).toEqual(expectedResponse)
  })

  test('document count decreases by one after delete', async () => {
    const resBeforeDelete = await api.get('/api/blogs')
    await api
      .delete('/api/blogs/'+initialBlogs[0]._id)
      .set('authorization', tokenString)
    const resAfterDelete = await api.get('/api/blogs')

    expect(getResLength(resAfterDelete)).toEqual(getResLength(resBeforeDelete) - 1)
  })

  test('400 on invalid id', async () => {
    await api
      .delete('/api/blogs/thisIsNotAValidObjectID')
      .expect(400)
  })

  test('401 on no token', async () => {
    await api
      .delete('/api/blogs/'+initialBlogs[0]._id)
      .expect(401)
  })

  test('401 on invalid token', async () => {
    await api
      .delete('/api/blogs/'+initialBlogs[0]._id)
      .set('authorization', tokenString.replace('1', '2'))
      .expect(401)
  })
})

describe('PUT', () => {
  test('400 on invalid id', async () => {
    const blog = { ...initialBlogs[0], likes: 99 }

    await api
      .put('/api/blogs/thisIsNotAValidObjectID')
      .send(blog)
      .expect(400)
  })

  test('401 on no token', async () => {
    const blog = { ...initialBlogs[0], likes: 99 }

    await api
      .put('/api/blogs/'+blog._id)
      .send(blog)
      .expect(401)
  })

  test('401 on invalid token', async () => {
    const blog = { ...initialBlogs[0], likes: 99 }

    await api
      .put('/api/blogs/'+blog._id)
      .set('authorization', tokenString.replace('1', '2'))
      .send(blog)
      .expect(401)
  })

  test('change number of likes on an entry', async () => {
    const blog = { ...initialBlogs[0], likes: 99 }

    const expectedResponse = JSON.parse(JSON.stringify(new Blog(blog)))

    const res = await api
      .put('/api/blogs/'+blog._id)
      .set('authorization', tokenString)
      .send(blog)
      .expect(200)

    expect(res.body).toEqual(expectedResponse)
  })
})

afterAll(() => mongoose.connection.close())