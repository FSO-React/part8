const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const gql = require('graphql-tag')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid');
const { authors, books } = require('./data/index')

const typeDefs = `
  type Query {
    authorCount: Int!
    bookCount: Int!
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
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