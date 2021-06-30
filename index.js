const express = require('express')
const multer = require('multer')
const cors = require('cors')
const methodOveride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const parentController = require('./controllers/parent')
const User = require('./models/user-model')
const app = express()


app.use(methodOveride('_method'))
app.set('view engine', 'hbs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.set("port", process.env.PORT || 3000);
app.use(parentController)

app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())





app.listen(app.get("port"), () => {
    console.log(`listening on ${app.get("port")}`)
})

