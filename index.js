const express = require('express')
const app = express()
const summarizeText = require('./summarize.js')
const { config } = require('process')
const port = process.env.PORT
require('dotenv').config()

// Parses JSON bodies (as sent by API clients)
app.use(express.json())

// Serves static files from the 'public' directory
app.use(express.static('public'))

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize
  summarizeText(text)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      console.log(error)
    })
})
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
