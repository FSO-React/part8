const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const gql = require('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid');
let { authors, books } = require('./data/index')

const typeDefs = `
  type Author {
    name: String!
    bookCount: Int
    born: Int
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
    allAuthors(name: String): [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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
    allAuthors: (root, args) => {
      let filteredAuthors = authors;
      if (args.name) {
        filteredAuthors = filteredAuthors.filter(a => a.name === args.name);
      }
      return filteredAuthors
    }
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
  Mutation: {
    addBook: (root, args) => {
      let author = authors.find(a => a.name === args.author)
      if (!author) {
        author = resolvers.Mutation.addAuthor(root, { name: args.author })
      }
      const book = { ...args, author: author.name, id: uuid() }
      books = books.concat(book)
      return book
    },
    addAuthor: (root, args) => {
      const author = { ...args, id: uuid() }
      authors = authors.concat(author)
      return author
    },
    editAuthor: (root, args) => {
      let author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === updatedAuthor.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
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