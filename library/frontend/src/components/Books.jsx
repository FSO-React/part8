/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries/books'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre === 'all genres' ? null : selectedGenre },
    fetchPolicy: 'network-only'
  })
  const resultGenres = useQuery(ALL_GENRES)

  if (!show) {
    return null
  }

  if (resultBooks.loading || resultGenres.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks
  const genres = [ ...resultGenres.data.allGenres, 'all genres' ]

  return (
    <div>
      <h2>books</h2>

      <div>
        books in genre <strong>{selectedGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
