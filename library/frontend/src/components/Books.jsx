/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/books'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres")
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = books
    .map((a) => a.genres)
    .reduce((a, b) => a.concat(b), [])
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .concat('all genres')

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
          {
            selectedGenre === 'all genres' &&
            books.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))
          }
          {
            selectedGenre !== 'all genres' &&
            books.map(book => (
              book.genres.includes(selectedGenre) &&
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))
          }
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
