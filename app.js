// IMPORT CONFIG AND DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
var fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

// IMPORT DATABASE
const sequelize = require('./database/database');

// IMPORT MODELS
const User = require('./model/user')
const User_Roles = require('./model/user_roles')
const Group = require('./model/group')
const Chat = require('./model/chat')
const Post = require('./model/post')
const Like = require('./model/like')
const Comment = require('./model/comment')
const Story = require('./model/story')
const Conversation = require('./model/conversation')
//Import Route
const authRoutes = require('./routes/auth/auth')
const adminRoutes = require('./routes/admin/admin')
const userRoutes = require('./routes/user/user')




const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }

}



app.use(bodyParser.json());  // application-json
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// app.use('./images',express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.io = io;
    next();
})


// app.use((req,res,next)=>{
// User.findByPk(1).then((user)=>{
//   req.user=user;
//   next();
// }).catch((err)=>{
//   console.log(err)
// });
// })


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes)

app.use(helmet());
app.use(compression());


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

io.on('connection',socket=>{
    require('./controller/chat/chatController')(socket)
    console.log(socket.id , "socket=====")
    let user={}
    socket.on('user_connected',user=>{
        console.log(user)
        socket.id=user.id
        socket.emit("connected",socket.id)
        
    })
    
    socket.on('send_message',(message)=>{
       // console.log(message, '======',message.id)
        io.emit('new_message',message)
        
    })

})

// RELASHIONSHIP DB

User.hasOne(User_Roles)

User.hasMany(Conversation)
Conversation.belongsTo(User)

Group.hasMany(Post)
Post.belongsTo(Group)

Conversation.hasMany(Chat)
Chat.belongsTo(Conversation)

User.hasMany(Group)
Group.belongsTo(User)

User.hasMany(Story)
Story.belongsTo(User)




User.hasMany(Post)
Post.belongsTo(User)


Post.hasMany(Comment)
Comment.belongsTo(Post)

Post.hasMany(Like)
Like.belongsTo(Post)


/* 
TODO: db guncelleme için bunu yap

sequelize
    .sync({force : true})

*/

 // 1 group Admin 2 user
let userData = null;
sequelize
    .sync()
    .then((result) => {
        console.log(result);
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({
                email: "socialnetwork@yatoo.com",
                name : "Fatih",
                password: "Admin",
                photo: "null",
                type: 'Admin',
                telephone : "123123",
                surname : "wefsdf",
                deleted: false
            })
        }
        return user;
    })
    .then((user) => {

        userData = user;
        return User_Roles.findByPk(1);
    })
    .then((UserRole) => {
        console.log("kjsfnv ", userData.id);
        if (!UserRole) {
            return User_Roles.create({
                roleName: "Admin",
                userId: userData.id,
                deleted: false
            })
        }
        return UserRole
    })
    .then((UserRole) => {
        // const dir = './images';
        // if (!fs.existsSync(dir)) {
        //   fs.mkdirSync(dir);
        // }
        console.log(UserRole);
        http.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    });





