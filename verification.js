const{v4 : uuidv4} = require("uuid")
require('dotenv').config();
const nodemailer =require('nodemailer');
const mysql = require("mysql")
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

const bcrypt = require("bcryptjs/dist/bcrypt");
async function emailVer(email, userId){
    let uniqueString = uuidv4() + String(userId);
    let currentURL = "http://localhost:5001/"


let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'resturantwhite@gmail.com',
        pass: 'White123@',
    }
});
let mailOptions ={
  from: 's120249171@stu.najah.edu',
  to: `${email}`,
  subject:'Email verification',
  html: `<p>Complete your sign up into your account. </p>
  <p>This link expires in 6 hours.</p> <a href = ${currentURL + "auth/verify/"+ userId + "/" + uniqueString}> Click here to complete the process</a>`,
};

let hashedString 
db.query("INSERT INTO verification SET?",{userId:userId,uniqueString:uniqueString}, (error)=>{
        if(error){
            console.log("Error while inserting to verification table" + error);
        }else{
            console.log("Inserted successfully (unoiqueString)")
        }
    })
    




transporter.sendMail(mailOptions,function(err,data){
    if(err){
console.log('error occurs' + err);
    }
    else{
        console.log('Email sent!!')
    }
});
}

module.exports = {emailVer}