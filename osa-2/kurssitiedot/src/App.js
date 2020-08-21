import React from 'react'
import Course from './Course'


const App = ({ courses }) => {
  return (
    <div>
      <h1>Web-dev curriculum</h1>
      {courses.map(a => <Course key={a.id} course={a} />)}
    </div>
  )
}

export default App