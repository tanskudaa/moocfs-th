import React, { useState } from 'react'
import ReactDOM from 'react-dom'


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

const Statistics = ({ stats }) => {
  if (stats.all !== 0)
    return (
      <table>
        <tbody>
          <StatisticsLine stat={stats.good} name='good' />
          <StatisticsLine stat={stats.neutral} name='neutral' />
          <StatisticsLine stat={stats.bad} name='bad'/>
          <StatisticsLine stat={stats.all} name='all'/>
          <StatisticsLine stat={stats.average} name='average'/>
          <StatisticsLine stat={stats.positive} name='positive'/>
        </tbody>
      </table>
    )

  return <div>No feedback given</div>
}

const StatisticsLine = ({ stat, name }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{stat}</td>
    </tr>
  )
}


const App = () => {
  // States
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState('0 %')

  const states = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }


  // Functions
  const percent = (a, b) => (a/b * 100) + ' %'


  // Handlers
  const handleGoodClick = () => {
    setAverage((good + 1 - bad) / (all + 1))
    setPositive(percent(good + 1, all + 1))
    setAll(all + 1)
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAverage((good - bad) / (all + 1))
    setPositive(percent(good, all + 1))
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAverage((good - bad - 1) / (all + 1))
    setPositive(percent(good, all + 1))
    setAll(all + 1)
    setBad(bad + 1)
  }


  // SPA
  return (
    <div>
      {/* Feedback buttons */}
      <Heading value="give feedback" />
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>

      {/* Statistics */}
      <Heading value="statistics" />
      <Statistics stats={states}/>
    </div>
  )
}

// Render
ReactDOM.render(<App />,
  document.getElementById('root')
)
