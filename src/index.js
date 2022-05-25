const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(500).send('Hello World!')
})

app.listen(3000)

module.exports = app