import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Notice = ({ message }) => {
  if (message !== "" && message !== null && typeof message !== "undefined" ) {
    return (
      <div className="notice">
        {message}
      </div>
    )
  }

  else {
    return null
  }
}

const Error = ({ message }) => {
  if (message !== "" && message !== null && typeof message !== "undefined" ) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  else {
    return null
  }
}

const FilterForm = ({ keyword, keywordSetter }) => {
  return (
    <form>
      <div>
        filter shown with
        <input
          value={keyword}
          onChange={(e) => keywordSetter(e.target.value)}
        />
      </div>
    </form>
  )
}

const NewPersonForm = (
    {
      newName,
      newNameSetter,
      newNumber,
      newNumberSetter,
      addPerson
    }) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={(e) => newNameSetter(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => newNumberSetter(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilteredPersons = ({ list, keyword, deletePerson }) => {
  const filtered = list.filter(a => a.name.includes(keyword))

  return (
    filtered.map(a => (
      <div key={a.id}>
        {a.name} {a.number}
        <button onClick={() => deletePerson(a)}>delete</button>
      </div>
    ))
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ noticeMessage, setNoticeMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)


  useEffect(() => {
    const doesntExist = {
      id: -1,
      name: "doesn't exist",
      number: ""
    }

    personService
      .getAll()
      .then(response => {
        // setPersons(response)
        setPersons(response.concat(doesntExist))
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personIndex = persons.map(a => a.name).indexOf(newName)

    if  (
          personIndex !== -1 && 
          window.confirm(`${newName} is already added. Update number?`)
        ) {
      personService
        .update(persons[personIndex].id, newNumber)
        .then(response => {
          const newPersons = (persons
              .filter(a => a.id !== response.id)
              .concat(response))
          setPersons(newPersons)
          setNoticeMessage(`Updated ${newName}`)
          setTimeout(() => {setNoticeMessage(null)}, 3000)
        })
    }

    else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNoticeMessage(`Added ${newName}`)
          setTimeout(() => {setNoticeMessage(null)}, 3000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Really delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          if (response === 1) {
            setPersons(persons.filter(a => a.id !== person.id))
            setErrorMessage(`${person.name} has already been removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
          }
          else {
            setPersons(persons.filter(a => a.id !== response.id))
            setNoticeMessage(`Removed ${person.name}`)
            setTimeout(() => {setNoticeMessage(null)}, 3000)
          }
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm
        keyword={keyword}
        keywordSetter={setKeyword}
      />

      <Notice message={noticeMessage} />
      <Error message={errorMessage} />

      <h2>Add new</h2>
      <NewPersonForm
        newName={newName}
        newNameSetter={setNewName}
        newNumber={newNumber}
        newNumberSetter={setNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <FilteredPersons
        list={persons}
        keyword={keyword}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App