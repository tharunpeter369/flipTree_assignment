const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const lumiAuthRouter = require('./routes/lumiRouter')
const lumiProfileRouter = require('./routes/lumiProfileRouter')
const lumiActivityRouter = require('./routes/lumiActivityRouter')

const port = 3000
const mongodb = require('./config/dataBase')
const {authenticateJWT} = require('./middlewares/authMiddleware');

//app level middleware
app.use(express.json())
app.use(cors())
dotenv.config()

app.use(logger);
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
//db setup
mongodb()
//routes setup
app.use('/api/auth', lumiAuthRouter)
app.use(authenticateJWT);
app.use('/api/profile', lumiProfileRouter)
app.use('/api/activity', lumiActivityRouter)

//starting server
app.listen(port, () => {
    console.log(`backend server is running on port ${port}`);
})