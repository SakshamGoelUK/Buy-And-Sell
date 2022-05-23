if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const local = require('./local');
const google = require('./google');
const mysql = require('mysql2');
const nodemailer = require('nodemailer')
const connect = require('./schemas/database');
const connection = mysql.createConnection(connect);
const sharedSession = require('express-socket.io-session');
const methodOverride = require('method-override');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const { user } = require('./schemas/database');
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter();
emitter.setMaxListeners(100)
const { cloudinaryConfig, sessionConfig } = require('./config');
const session = require('express-session')(sessionConfig);
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SECRET));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  done(null, user);
});
app.use(session);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
const server = app.listen(3000, () => {
  console.log('Listening on port:3000');
});
const users = {};
const activeUsers = {}
const io = require('socket.io')(server);
io.use(
  sharedSession(session, {
    autoSave: true,
  })
);
io.on('connection', (socket) => {
  socket.on('new-user',async(name) => {
    socket.join(name.roomName)

      socket.handshake.session.socketId = socket.id
        const { currentUser, roomName,webLoad } = name
      socket.handshake.session.roomName = roomName

      socket.handshake.session.save()
      users[socket.handshake.session.socketId] = name;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
                port: 587,
                ignoreTLS: false,
                secure: false,
                auth: {
                  user: process.env.USER,
                  pass: process.env.PASSWORD,
                },
      })
      let botMessage
      productData = socket.handshake.session.productView
      if(productData.Seller !== socket.handshake.session.userData.email && webLoad !== 'reload'){
      try {

        const sql1 = await connection.promise().query('SELECT `emailChat` FROM users WHERE email=?',[socket.handshake.session.productView.Seller])
        const sql2 = await connection.promise().query('INSERT INTO notifications VALUES (?,?,?)',[`${socket.handshake.session.productView.Seller}`,`${socket.handshake.session.userData.email} is waiting in the chatRoom of the product ${socket.handshake.session.productView.Name}`,Date.now()])
        if(sql1[0][0].emailChat === 'true'){
          const data = await ejs.renderFile(__dirname + '/routes/chatRoomEmail.ejs',{productData});
          const mailOptions = {
            from: process.env.USER,
            to: socket.handshake.session.productView.Seller,
            subject: 'Prospective Buyer',
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

            } else {

            }
          });
        }
        const sql5 = await connection.promise().query('UPDATE users SET notification = notification+1 WHERE email=?',[socket.handshake.session.productView.Seller])
        socket.handshake.session.save()
        const notificationNo = socket.handshake.session.userData.notification
        const seller = socket.handshake.session.productView.Seller
        io.sockets.emit('increase',{notificationNo,seller})
      } catch (err) {

      }}

      socket.to(roomName).emit('User-Connected', { currentUser,webLoad,botMessage });

    });
socket.on('accessReq',(data)=>{
  const notificationNo = socket.handshake.session.userData.notification
const seller = data.productSeller

io.sockets.emit('increase',{seller})
})
  socket.on('notification',async(data)=>{
      const sql1 = await connection.promise().query('UPDATE users SET notification = notification+1 WHERE `email`=?',[socket.handshake.session.userData.email])
      socket.handshake.session.userData.notification =  socket.handshake.session.userData.notification + 1
      socket.handshake.session.save()
      const notificationNo = socket.handshake.session.userData.notification
      io.sockets.emit('increase',{notificationNo})
  })
  socket.on('send-chat-message', (message1) => {
    const { message, roomName } = message1;
    socket
      .to(roomName)
      .emit('chat-message', { message, name:socket.handshake.session.userData.FirstName });
  });
  if(socket.handshake.session.active === undefined){
    socket.on('isActive',async(data)=>{
      try{
        const sql1 = await connection.promise().query('INSERT INTO Active VALUES(?)',[socket.handshake.session.userEmail])
      }catch(e){
      }
    })

  }
  socket.on('disconnect',async()=>{
    const sql1 = await connection.promise().query('DELETE FROM Active WHERE Email=?',[socket.handshake.session.userEmail])
  })
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.all('*', (req, res) => {
  res.redirect('/products/allItems/filters/All');
});
