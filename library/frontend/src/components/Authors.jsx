/* eslint-disable react/prop-types */
import AuthorsList from './AuthorsList'
import AuthorEdition from './AuthorEdition'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/authors'

const Authors = ({ show, token }) => {
  const result = useQuery(ALL_AUTHORS)

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <AuthorsList authors={authors} />
      {
        token &&
        <AuthorEdition authors={authors} />
      }
    </div>
  )
}

export default Authors
