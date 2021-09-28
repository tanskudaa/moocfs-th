const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    _id: '5a422aa71b54a676234d17f8',
    username: 'MVM',
    name: 'Marvin Mark',
    passwordHash: '09 the_house',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    username: 'Care',
    name: 'Carrie Mark',
    passwordHash: 'NLM',
    __v: 0
  }
]

const newUser = {
  // _id: '5fa01cd3539c900d15c837e6',
  username: 'paleskowitz',
  name: 'Paul',
  password: 'petscop',
  __v: 0
}

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('GET', () => {
  test('get all users returns with 201 and js object', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST', () => {
  test('creating new user returns with 201 and js object', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('2-digit password is too weak', async () => {
    const badUser = { ...newUser, password: 'no' }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('empty password gets declined, test 1', async () => {
    const { password, ...badUser } = newUser

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('empty username gets declined, test 2', async () => {
    const { username, ...badUser } = newUser

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('empty username gets declined, test 3', async () => {
    const badUser = { ...newUser, username: 'me' }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('duplicate username gets declined', async () => {
    let res = await api
      .post('/api/users')
      .send(newUser)

    console.log(res.body)

    res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    console.log(res.error)
  })
})

afterAll(() => mongoose.connection.close())
