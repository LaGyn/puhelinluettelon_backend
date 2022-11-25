// Luodaan web-serveri:

const http = require('http'); // Ottaa käyttöön Noden sisäänrakennetun web-palvelimen määrittelevän moduulin

const puhLuettelo = http.createServer((request, response) => { // Http-moduulin metodi createServer luo web-palvelimen, jolle se rekisteröi samalla tapahtumankäsittelijän: request
    response.writeHead(200, {'Content-Type': 'text/plain'}) // response.writeHead() on http-moduulin sisäänrakennettu ominaisuus, joka lähettää pyynnölle header vastauksen
    response.end('My first backend experience!')
})

const PORT = 3001
puhLuettelo.listen(PORT) // Muuttujaan puhLuettelo sijoitettu http-palvelin sidotaan kuuntelemaan porttiin tulevia pyyntöjä.
console.log('Server running at port ${PORT}')
