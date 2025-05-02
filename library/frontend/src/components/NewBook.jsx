/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES, CREATE_BOOK } from '../queries/books'
import { ALL_AUTHORS } from '../queries/authors'
import { updateCache } from '../helper'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: ALL_GENRES }],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.exception.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      setError(messages)
    },
    update: (cache, response) => {
      console.log(response.data.addBook)
      const addedBook = response.data.addBook
      updateCache(cache, { query: ALL_BOOKS }, addedBook);
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    if (!title || !author || !published || genres.length === 0) {
      setError('title, author, published and genres are required')
      return
    }

    const publishedInt = parseInt(published)
    await createBook({ variables: { 
        title: title, 
        author: author, 
        published: publishedInt,
        genres: genres 
      } 
    })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (!genres.includes(genre) && genre !== '') {
      setGenres(genres.concat(genre))
    }
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook