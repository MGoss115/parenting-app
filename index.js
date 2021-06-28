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
app.set("port", process.env.PORT || 3000);
app.use(parentController)



app.listen(app.get("port"), () => {
    console.log(`listening on ${app.get("port")}`)
})

