import React, { useState } from 'react'
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/' >anecdotes</Link>
      <Link style={padding} to='/create' >create new</Link>
      <Link style={padding} to='/about' >about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = event => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.createNotification(`a new anecdote ${content.value} created!`)
    history.push('/')
  }

  const resetFields = event => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  const { reset: _remove0, ...inputContent } = content
  const { reset: _remove1, ...inputAuthor } = author
  const { reset: _remove2, ...inputInfo } = info

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        content
        <input {...inputContent} />
        <br/>
        author
        <input {...inputAuthor} />
        <br/>
        url for more info
        <input {...inputInfo} />
        <br/>

        <button onClick={handleSubmit}>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => <div>{message}</div>

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [timeoutIds, setTimeoutIds] = useState({
    notification: null
  })

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const createNotification = (message, timeoutSec = 3) => {
    if (timeoutIds.notification) clearTimeout(timeoutIds.notification)
    setNotification(message)
    const notificationTimeoutId = setTimeout(() => {
      setNotification('')
      setTimeoutIds({ ...timeoutIds, notification: null })
    }, timeoutSec * 1000)
    setTimeoutIds({ ...timeoutIds, notification: notificationTimeoutId })
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />

      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} createNotification={createNotification} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;