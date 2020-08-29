import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryInfo = ({ countries, keywordSetter }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many!
      </div>
    )
  }

  else if (countries.length > 1) {
    return (
      <ListCountries
        countries={countries}
        keywordSetter={keywordSetter}
      />
    )
  }

  else if (countries.length === 1) {
    return <ListCountryInfo country={countries[0]} />
  }

  else {
    return (
      <div>
        No countries found
      </div>
    )
  }
}

const ListCountries = ({ countries, keywordSetter }) => {
  const ulStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0
  }

  return (
    <ul style={ulStyle}>
      {countries.map(a => (
        <li key={a.numericCode}>
          {a.name}
          <button onClick={() => keywordSetter(a.name)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

const ListCountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}<br/>
      population {country.population}<br/>

      <h3>languages</h3>
      <ul>
        {country.languages.map(a => <li key={a.iso639_2}>{a.name}</li>)}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        height={100}
      />
    </div>
  )
}


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ keyword, setKeyword ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(promise => setCountries(promise.data))
  }, [])


  return (
    <>
      find countries
      <input 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <CountryInfo
        countries={countries.filter(a => a.name.includes(keyword))}
        keywordSetter={setKeyword}
      />
    </>
  );
}

export default App
