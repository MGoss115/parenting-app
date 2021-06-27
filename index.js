const express = require('express')
const multer = require('multer')
const cors = require('cors')
const methodOveride = require('method-override')
const parentController = require('./controllers/parent')
const app = express()


app.use(methodOveride('_method'))
app.set('view engine', 'hbs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(parentController)



app.listen(3000, () => {
    console.log('Magic running on port 3000')
})

