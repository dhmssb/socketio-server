require('dotenv').config();
const express = require ('express')
const cors = require('cors')
const app = express()
const cookieParser = require ('cookie-parser')
const corsOptions = { 
  origin: 'http://localhost:3000/',
  credential: true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions))

const http = require('http').Server(app)
const bodyParser = require ('body-parser')
const socketio =require ('socket.io')
const io = socketio(http)
const Room = require ('./models/Room')
const Message = require ('./models/Message')


const authRoutes = require ('./routes/authRoutes')
const mongodbConnection = require ('./config/database')
const {addUser, getUser, removeUser} = require ('./helper')

const PORT = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)

app.get('/set-cookies', (req,res) => {
  res.cookie('username', 'Stark')
  res.cookie('isAuthenticated', true, {maxAge: 12*60*60*1000})
  res.send('cookies are set')
})
app.get('/get-cookies', (req,res) => {
   const cookies = req.cookies
   console.log(cookies)
   res.json(cookies)
})

io.on('connection', (socket) => {
  console.log(socket.id)
  Room.find().then(result => {
    console.log
    socket.emit('output-rooms', result)
  })
  socket.on('create-room', name =>{
     // console.log('then room name received is', name)
     const room = new Room({name})
     room.save().then(result => {
       io.emit('room-created', result)
     })
  })

  
  socket.on('join', ({name,room_id,user_id}) =>{
    const {error,user} = addUser({
      socket_id:socket.id,
      name,
      room_id,
      user_id
    })

    socket.join(room_id)
    if(error){
      console.log('join error', error)
    }else{
      console.log('join user',user)
    }
  })
  socket.on('sendMessage', (message, room_id,callback) =>{
    const user = getUser(socket.id)
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text:message
    }
    console.log('message', msgToStore)
    const msg = new Message(msgToStore)
    msg.save().then(result => {
      io.to(room_id).emit('message', result)
      callback()

    })
  })

  socket.on('disconnect',() =>{
    const user = removeUser(socket.id)
  })
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});