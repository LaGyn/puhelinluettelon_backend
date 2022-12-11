const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.kczjgio.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
  //id: Number,
})

const Person = mongoose.model('Person', personSchema)

// Model konstruktorifunktio. Luo parametrien perusteella javascript olion:
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  //id: generateId(),
})

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });

if (process.argv[2] && !process.argv[3] && !process.argv[4]){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (!process.argv[3] == "" && !process.argv[4] == "") {
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
}
