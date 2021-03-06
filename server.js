const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override");
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')


require('dotenv').config({path: './config/.env'})
// Passport config
require("./config/passport")(passport);

// Connect to DB
const clientPromise = connectDB()
  .then(conn => conn.connection.getClient())


//EJs
app.set('view engine', 'ejs')

// Static folder
app.use(express.static('public'))

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"));

//CREATE A SESSION
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ clientPromise }),
  }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use forms for put / delete
app.use(methodOverride("_method"));

//Use flash messages for errors, info, ect...
app.use(flash());

// Setup routes for server
app.use('/', mainRoutes)
app.use('/post', postRoutes);

// Server running
app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!', `It's running on ${process.env.PORT}`)
})