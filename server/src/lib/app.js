const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require('dotenv').config();

const {
  resolve
} = require('path')
const config = require('../../config/config')

const app = express()

const corsOptions = {
  credentials: true,
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Token']
}

var cors = require('cors')
app.all('*', cors(corsOptions))

// Set up mongoose connection
var mongoose = require('mongoose')
mongoose.connect(config.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// 後台
/*
const backendPublicPath = resolve(__dirname, '../../../backend/dist')
app.use('/backend', express.static(backendPublicPath))
*/
const frontendPublicPath = resolve(__dirname, '../../../frontend/dist')
app.use('/', express.static(frontendPublicPath))

app.use(bodyParser.json())
app.use(helmet())

const router = require('../routes/index')
app.use(config.baseAPIUrl, router)

// 沒用到的
/*
app.get('/', (req, res, next) => {
  res.status(200).sendFile(join(config.basedir, '../backend/dist/index.html'))
})

const backendRouter = require('../routes/backend')
app.use('/backend', backendRouter)

const frontendRouter = require('../routes/frontend')
app.use('/', frontendRouter) */

// app.use(require('./middleware/error_middleware').all)

module.exports = app
