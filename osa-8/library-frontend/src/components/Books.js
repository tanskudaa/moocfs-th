import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  if (!props.show) {
    return null
  }

  const [getBooks, queryResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genreFilter, setGenreFilter] = useState('all')

  useEffect(() => {
    const vars =
      genreFilter !== 'all' ? { variables: { genre: genreFilter } } : null
    getBooks(vars)
  }, [genreFilter])

  useEffect(() => {
    if (queryResult.data) {
      const sortedBooks = [...queryResult.data.allBooks]
      sortedBooks.sort((a, b) => a.author.name.localeCompare(b.author.name))
      setBooks(sortedBooks)

      if (genreFilter === 'all') {
        const allGenres = Array.from(
          sortedBooks.reduce(
            (accumulator, b) => accumulator.add(...b.genres),
            new Set()
          )
        )
        setGenres(allGenres)
      }
    }
  }, [queryResult.data])

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
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Select genre:</div>
      <div>
        {genres.concat('all').map(g => (
          <button
            key={g}
            value={g}
            onClick={({ target }) => setGenreFilter(target.value)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
