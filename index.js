const express = require('express')
const cors = require('cors')
const parentController = require('./controllers/parent')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(parentController)



app.listen(3000, () => {
    console.log('Magic running on port 3000')
})

