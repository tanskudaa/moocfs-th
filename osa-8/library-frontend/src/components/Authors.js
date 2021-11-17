import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [ getAuthors, queryResult ] = useLazyQuery(ALL_AUTHORS)
  const [ authors, setAuthors ] = useState([])
  const [ inputName, setInputName ] = useState('')
  const [ inputYear, setInputYear ] = useState('')

  useEffect(() => {
    getAuthors()
  }, [])

  useEffect(() => {
    if (queryResult.data) setAuthors(queryResult.data.allAuthors)
  }, [queryResult])

  useEffect(() => {
    if (authors.length > 0 && inputName === '') setInputName(authors[0].name)
  }, [authors])

  const handleBornSubmit = (event) => {
    event.preventDefault()

    setBirthYear({ variables: { name: inputName, setBornTo: parseInt(inputYear) } })
    // Don't update inputName, uses <select>
    // setInputName('')
    setInputYear('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleBornSubmit}>
          <table>
            <tbody>
              <tr>
                <td>name</td>
                <td>
                  {/* <input
                    value={inputName}
                    onChange={({ target }) => setInputName(target.value)}
                  /> */}
                  <select value={inputName} onChange={({ target }) => setInputName(target.value)}>
                    {authors.map(a =>
                      <option key={a.name}>{a.name}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td>born in</td>
                <td>
                  <input
                    value={inputYear}
                    onChange={({ target }) => setInputYear(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Set birthyear</button>
        </form>
      </div>
    </>
  )
}

export default Authors