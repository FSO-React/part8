import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/authors'

const AuthorEdition = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleEdition = (event) => {
    event.preventDefault()
    if (!name || !born) {
      console.error('name and born year are required')
      return
    }
    const payload = {
      name: name,
      setBornTo: parseInt(born)
    }
    editAuthor({ variables: { ...payload } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleEdition}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorEdition