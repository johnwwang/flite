const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
const messages1 = []
const messages2 = []

// socket.io server
io.on('connection', socket => {
  socket.on('message1', (data) => {
    messages1.push(data)
    socket.broadcast.emit('message1', data)
  })
  socket.on('message2', (data) => {
    messages1.push(data)
    socket.broadcast.emit('message2', data)
  })
})

nextApp.prepare().then(() => {
  app.get('/messages1', (req, res) => {
    res.json(messages1)
  })
  app.get('/messages2', (req, res) => {
    res.json(messages2)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})