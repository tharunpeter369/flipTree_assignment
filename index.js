const express = require('express')
const app = express()
const lumiRouter = require('./routes/lumiRouter')
const port = 3000
const mongodb = require('./config/dataBase')

//app level middleware
app.use(express.json())


mongodb()

//routes setup
app.use('/api', lumiRouter)

//starting server
app.listen(port, () => {
    console.log(`backend server is running on port ${port}`);
})