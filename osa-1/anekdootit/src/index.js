import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const Heading = ({ value }) => {
  return (
    <div>
      <h1>{value}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const RandomInt = (min, max) => {
  let rand = min + (Math.random() * (max - min))
  console.log('min =', min, 'max =', max, 'rand =', rand, 'returning: ', Math.round(rand))
  return Math.round(rand)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNextAnecdote = () => {
    let next_index = RandomInt(0, props.anecdotes.length - 1)
    setSelected(next_index)
  }
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    let v = 0
    let best
    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > v) {
        v = copy[i]
        best = i
      }
    }
    setMostVotes(best)
  }

  return (
    <div>
      {/* Anecdote of the day */}
      <Heading value="Anecdote of the day" />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
      <br/>
      {props.anecdotes[selected]}
      <br/>
      Has {votes[selected]} votes

      {/* Anecdote with most votes */}
      <Heading value="Anecdote with most votes" />
      {props.anecdotes[mostVotes]}
      <br/>
      Has {votes[mostVotes]} votes
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)