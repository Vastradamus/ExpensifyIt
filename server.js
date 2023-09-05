const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')



//routers 

const mainRoutes = require('./routes/main')
const processRoutes = require('./routes/process-receipt')
const categoriesRoutes = require('./routes/categories')
const dashboardRoutes = require('./routes/dashboard')

require('dotenv').config({path: './config/.env'})

// Passport config

require('./config/passport')(passport)

connectDB()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
    }),
  })
)


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

// routers 

app.use('/', mainRoutes)
app.use('/process-receipt', processRoutes)
app.use('/categories', categoriesRoutes )
app.use('/dashboard', dashboardRoutes)

app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on a port ${process.env.PORT}, you better catch it!`)
})  
