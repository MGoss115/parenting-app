const express = require('express')
const app = express()
const cors = require('cors')
const Kids = require('./models/kids-model')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Magic running on port 3000')
})

app.get('/', (req, res) => {
    Kids.find({})
    .then(kid => res.json(kid))
})