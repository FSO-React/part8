const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const gql = require('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid');
const { authors, books } = require('./data/index')

const typeDefs = `
  type Author {
    name: String!
    bookCount: Int!
    born: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filteredBooks = books;
      if (args.author) {
        filteredBooks = filteredBooks.filter(b => b.author === args.author);
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre));
      }
      return filteredBooks;
    },
    allAuthors: () => authors
  },
  // Book: {
  //   author: (root) => {
  //     const author = authors.find(a => a.name === root.author)
  //     return author.name
  //   }
  // },
  Author: {
    bookCount: (root) => {
      booksOfAuthor = books.filter(b => b.author === root.name)
      return booksOfAuthor.length
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})