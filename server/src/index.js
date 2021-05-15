const http = require('http')
const app = require('./lib/app')
const PORT = process.env.PORT || 80

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
}).on('error', err => {
  console.log('ERROR: ', err)
})
