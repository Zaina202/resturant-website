const express=require("express")
const path=require("path")
const mysql=require("mysql")
const dotenv=require('dotenv')
dotenv.config({path:'./.env'});

const app =express()
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieSession = require('cookie-session')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));
  
  app.use(session({ 
      secret: '123458cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 90000 }
    }));
  app.use(cookieParser());

const publicDirectory= path.join(__dirname,'./public')
app.use(express.static(publicDirectory))
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.set('view engine','hbs');
db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Mysql Connected...")
    }
})

app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))
app.use('/auth2',require('./routes/user'))
app.use('/auth3',require('./routes/tables'))
app.use('/auth4',require('./routes/meal'))
app.use('/auth5',require('./routes/deleteOrder'))
app.use('/',require('./routes/PasswordReset'))
app.listen(5001,()=>{
    console.log("server started on port 5001")
})







