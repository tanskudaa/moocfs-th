import React from 'react'


const Parts = ({ parts }) => parts.map(a => {
  return (
    <p key={a.id}>
      {a.name} {a.exercises}
    </p>
  )
})

const Total = ({ parts }) => {
  const total = parts.reduce((sum, a) => sum + a.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
