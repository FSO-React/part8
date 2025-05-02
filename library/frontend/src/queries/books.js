import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks (author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title 
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }  
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`