const { authors, books } = require('./data/index')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const addAuthors = async () => {
  for (const author of authors) {
    const newAuthor = new Author(author)
    await newAuthor.save()
    console.log(newAuthor.name)
  }
}

const addBooks = async () => {
  for (const book of books) {
    const author = await Author.findOne({ name: book.author })
    if (!author) {
      console.log(`Author not found for book: ${book.title}`)
      continue
    }
    const newBook = new Book({ ...book, author: author }) // asigna el ID
    await newBook.save()
    console.log(newBook)
  }
}

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(async () => {
    await Author.collection.drop().catch(() => {})
    await Book.collection.drop().catch(() => {})
    console.log('connected to MongoDB')

    await addAuthors()
    console.log('added authors')

    await addBooks()
    console.log('added books')

    mongoose.connection.close()
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
