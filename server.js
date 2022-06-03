require('dotenv').config({ path: './config.env' })

const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')

const typesRouter = require('./routes/types')
const brandsRouter = require('./routes/brands')
const equipmentRouter = require('./routes/equipment')
const termsRouter = require('./routes/terms')
const offersRouter = require('./routes/offers')

mongoose
  // .connect(process.env.MONGODB_URI)
  .connect("mongodb://127.0.0.1:27017/mawgood")
  .then(conn => {
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  })
  .catch(err => {
    console.error(`MongoDB ERROR - ${err.message}`)
  })

const API_ROOT = '/api/v1'
const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get(`${API_ROOT}/`, (_, res) => {
  res.json({ success: true, msg: 'Mawgood API v1' })
})

app.use(`${API_ROOT}/types`, typesRouter)
app.use(`${API_ROOT}/brands`, brandsRouter)
app.use(`${API_ROOT}/equipment`, equipmentRouter)
app.use(`${API_ROOT}/terms`, termsRouter)
app.use(`${API_ROOT}/offers`, offersRouter)

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    msg: "404, Path NOT Found!"
  })
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
