/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/books'
import { ME } from '../queries/login'

const Recommendations = ({ show }) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)

  if (!show) {
    return null
  }

  if (resultBooks.loading || resultMe.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks
  const me = resultMe.data.me

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{me.favoriteGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.map(book => (
                book.genres.includes(me.favoriteGenre) &&
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations