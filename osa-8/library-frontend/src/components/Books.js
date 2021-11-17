import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  if (!props.show) {
    return null
  }

  const [getBooks, queryResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    console.log(queryResult)
    if (queryResult.data) {
      setBooks(queryResult.data.allBooks)
    }
  }, [queryResult])

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
