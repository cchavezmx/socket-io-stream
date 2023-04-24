import path from 'node:path'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'

const app = express()
const __dirname = path.resolve()

const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000
const HTML_FILE = path.join(__dirname, 'index.html')


app.use(cors())
app.use(express.static(HTML_FILE))

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})