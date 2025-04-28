let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const mongoose = require('mongoose')
const Person = require('./models/person')

const addPersons = async () => {
  await Person.deleteMany({})

  for (let person of persons) {
    const newPerson = new Person({
      name: person.name,
      phone: person.phone,
      street: person.street,
      city: person.city
    })
    await newPerson.save()
  }
}

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')
    await addPersons()
    console.log('added persons to MongoDB')
    mongoose.connection.close()
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })