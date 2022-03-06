const express=require("express")
const path=require("path")
const mysql=require("mysql")
const dotenv=require('dotenv')

dotenv.config({path:'./.env'});

const app =express()

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

const publicDirectory= path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.set('view engine','hbs');

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("mysql connected...")
    }
})



app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))

app.listen(5001,()=>{
    console.log("server started on port 5001")
})









