import React, { useState } from 'react'


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

const FilteredPersons = ({ list, keyword }) => {
  const filtered = list.filter(a => a.name.includes(keyword))

  return (
    filtered.map(a => <div key={a.name}>{a.name} {a.number}</div>)
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
    { name: 'Aro Hellas', number: '040-1237244'},
    { name: 'Ato Hlas', number: '040-7231254'},
    { name: 'Art Hella', number: '040-1731244'},
    { name: 'Arto Hlaas', number: '040-1261244'},
    { name: 'Arto Helas', number: '040-1221244'},
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ keyword, setKeyword ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.map(a => a.name).indexOf(newName) !== -1) {
      alert(`${newName} already in phonebook!`)
      setNewName('')
      setNewNumber('')
    }

    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm keyword={keyword} keywordSetter={setKeyword} />

      <h2>Add new</h2>
      <NewPersonForm
        newName={newName}
        newNameSetter={setNewName}
        newNumber={newNumber}
        newNumberSetter={setNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <FilteredPersons list={persons} keyword={keyword} />
    </div>
  )
}

export default App