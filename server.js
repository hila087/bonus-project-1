const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// routes
const { courseRouter } = require('./routes/courses')

// -- init environment
require('dotenv').config()

// constants
const PORT = process.env['PORT'] || 5000

// -- init server
const app = express()

// -- init mongodb connection
require('./connections/mongo.connection')

// middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: '*'
}))

// app routes
app.use('/courses', courseRouter)


app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`))