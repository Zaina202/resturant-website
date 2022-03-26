const mysql=require("mysql")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})



const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")

exports.register=(req,res)=>{
console.log(req.body)

const{FName,LName,email,password,confirmPassword}=req.body
db.query('SELECT email FROM users WHERE email=?',[email],async(err,results)=>{
    if(err){
        console.log(err)
    }
    if(results.length>0){
        return res.render('sign_up',{
            message:'the email is already in use'

        })

    }else if(password!==confirmPassword){
        return res.render('sign_up',{
            message:'passwords do not match'
        })
    }
    // if(password==NULL || results.length==0){
    //     return res.render('sign_up',{
    //         message:'some field required'
    //     })
    // }
    let hashedpassword=await bcrypt.hash(password,8)
        db.query('INSERT INTO users SET?',{First_name:FName,Last_name:LName,email:email,password:hashedpassword},(err,results)=>{
    if(err){
        console.log(err)
    }else{
        console.log(results)
        return res.render('index',{
            message:'Succestully! Your account has been created'
        })
    }

    });
 
});

}