// Luodaan web-serveri:

//const http = require('http'); // Ottaa käyttöön Noden sisäänrakennetun web-palvelimen määrittelevän moduulin
const express = require('express')
const morgan = require('morgan')
const puhLuettelo = express()
const cors = require('cors')

puhLuettelo.use(express.json()) // Tämä on json-parseri eli middleware. Ilman tätä lisättävä muistiinpanon body olisi määrittelemätön
puhLuettelo.use(morgan('tiny'))
puhLuettelo.use(cors())
puhLuettelo.use(express.static('build'))

let persons = [
      { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
      },
      { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
      },
      { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
      },
      { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
      }
]
/*
const puhLuettelo = http.createServer((request, response) => { // Http-moduulin metodi createServer luo web-palvelimen, jolle se rekisteröi samalla tapahtumankäsittelijän: request
    response.writeHead(200, {'Content-Type': 'text/plain'}) // response.writeHead() on http-moduulin sisäänrakennettu ominaisuus, joka lähettää pyynnölle header vastauksen
    response.end(JSON.stringify(persons))
})*/

// Luodaan route urlit eri hauille:

puhLuettelo.get('/', (request, response) => {
    response.send('<h1>This is my first backend experience!</h1>') // Lähettää sivulle otsikon
})

puhLuettelo.get('/api/persons', (request, response) => {
    response.json(persons) // Json metodi palauttaa js-olion persons joka on taulukko
})

puhLuettelo.get('/info', (request, response) => {
    const lukumaara = persons.length;
    const date = new Date()
    console.log(lukumaara)
    response.send(`<h3>Phonebook has info for ${lukumaara} people.</h3>
                    <h3>${date}</h3>`) // HUOMIO muista backticillä!!
})

puhLuettelo.get('/api/persons/:id', (request, response) => { // Kaksoispiste syntaksilla määritellään parametri
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    response.json(person)
})

puhLuettelo.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end() // Jos poisto onnistuu vastataan statuskoodilla 204
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
        return maxId + 1;
}

puhLuettelo.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name || !body.number) {
        return response.status(400).json({ // returnin kutsuminen on tärkeää, ilman sitä koodi jatkaisi suoritusta ja virheellinen muistiinpano tallentuisi!
            error: 'name/number missing'
        })
    }
    if (persons.find(name => name.name == body.name)) {
        console.log('Löytyi')
        return response.status(400).json({ // returnin kutsuminen on tärkeää, ilman sitä koodi jatkaisi suoritusta ja virheellinen muistiinpano tallentuisi!
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})
/*
function getNumber(min, max){
    return Math.floor(Math.random() * max);
}*/



const PORT = process.env.PORT || 3001
puhLuettelo.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
}) // Muuttujaan puhLuettelo sijoitettu http-palvelin sidotaan kuuntelemaan porttiin tulevia pyyntöjä.

// Mikä ero on käyttää const express / const http??
// Miksi käytetään osoitetta '/api/jotain...'?? Mitä tuo api meinaa?
// Mikä tässä tarkalleen on se tapahtumankäsittelijä? request?
