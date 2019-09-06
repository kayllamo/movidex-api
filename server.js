require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const movieData = require('./movie-data.js');

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
  })

app.get('/movie', function handleGetMovie(req, res) {

  let response = movieData;

  /* SEARCH BY GENRE */
  if (req.query.genre) {
    response = response.filter(movieData =>
      // case insensitive searching
      movieData.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
}

  /* SEARCH BY COUNTRY */
  if (req.query.country) {
    response = response.filter(movieData =>
      // case insensitive searching
      movieData.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
}

  /* SEARCH BY AVG VOTE */
  if (req.query.avg_vote) {
    response = response.filter(movieData =>
      // greater than or equal to supplied number
      movieData.avg_vote >= req.query.avg_vote
    )
}

res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})