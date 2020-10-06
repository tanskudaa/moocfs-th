import axios from 'axios'


const baseUrl = '/api/persons'


const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then(response => response.data)
  )
}

const create = (newObject) => {
  return (
    axios
      .post(baseUrl, newObject)
      .then(response => response.data)
  )
}

const remove = (id) => {
  const remObject = axios
    .get(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(() => {
      console.log(`tried remove, but no object on id ${id}`)
      return 1
    })

  remObject.then(response => {
    if (response !== 1) {
      axios.delete(`${baseUrl}/${id}`)
      console.log(`succesfully removed id ${id}`)
    }
  })

  return remObject
}

const update = (id, newNumber) => {
  console.log(`updating id ${id}`)

  return getAll()
    .then(response => {
      const oldObject = response.find(a => a.id === id)
      console.log(oldObject)

      const updatedObject = { ...oldObject, number: newNumber}
      console.log(updatedObject)

      axios
        .put(`${baseUrl}/${id}`, updatedObject)

      return updatedObject
    })
}


export default { getAll, create, remove, update }
