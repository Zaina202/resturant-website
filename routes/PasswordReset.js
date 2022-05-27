const mysql = require("mysql")
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})
const express = require("express")
const router = express()
const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()  
function sendVerEmail(email){
    //url to be used in the email 
    currentURL = "http://localhost:5001/"
    const uniqueString = uuidv4();

    //nodemailer staff 
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
        user: 'whitelounge.ps@gmail.com',
        pass: 'White123456789',
        }
    });
    transporter.verify((error, success) =>{
        if(error){
            console.log("Failed to send Email" + error);
        }else{
            console.log("Email sent successfully"+ email)
        }
    })

//Step 2
    let mailOption = {
        from: 'Admin',       
        to: email, 
        subject: 'Reset Password Request', 
        html: `<p>Please click below to be able to reset your password, once you open this link it wont be valid anymore. </p>
         <a href = ${currentURL + "resetRequest/"+ email + "/" + uniqueString}> Click here </a>`
    };
    //hash the unique string
    hasheduniqueString = bcrypt.hash(uniqueString, 10)
    .then((hasheduniqueString) => {                 
        db.query("UPDATE users SET passwordUUID = ? WHERE email = ?", [hasheduniqueString, email], (err)=>{
            if(err){
                console.log("Error while inserting the uniqueString for password to the DB");
                res.render("forgot_pass", {message: "Please request another verification email"})
            }else{//step 3 
                transporter.sendMail(mailOption, function(err, data){
                    if(err){
                        console.log("Error While sending the verefication email! " + err)
                    }else{
                        console.log("Done !!")
                    }
                })
            }
        })
    })
    .catch((e)=>{
        console.log("Error while hasihng the unique string  ", e)
        res.render("forgot_pass", {message: "Please request another verification email"})
    })
}
//send email to resetpass
router.post("/newPasswordReq", (req, res)=>{
    let {email} = req.body  
    console.log(email) 
    db.query("SELECT EMAIL FROM users WHERE EMAIL = ?", [email], async(error, result)=>{
        if(error){
            console.log("Error while chicking if the user exists in the DB")  
            res.render("forgot_pass", {message: "Something went wrong please try again"})
        }else{
            if(result.length > 0){      
        sendVerEmail(email)
                res.render("forgot_pass", {message: "Please check your email to be able to reset your password"})
            }else{
                res.render("forgot_pass", {message: "Please enter a valid email"})   
                console.log(result)         
            }
        }
    }) 
})


router.get("/resetRequest/:email/:passwordUUID", (req, res)=>{
    let {email, passwordUUID} = req.params 
    db.query("SELECT passwordUUID FROM users WHERE email= ?", [email], async (error, result)=>{
        if(result[0].passwordUUID){
            let compResult    
            compResult = await bcrypt.compare(passwordUUID, result[0].passwordUUID)
            .then((compResult)=>{
                if(compResult){  
                    console.log(compResult)         
                    res.redirect(`/reset/${email}`)       
                    db.query("UPDATE users SET passwordUUID = NULL WHERE email = ?",[email], (error)=>{      
                        if(error){       
                            console.log("Error occured while deleting the reset password string ", error);    
                        }else{
                            console.log("passwordUUID Deleted successfully!")
                        }  
                    }) 
                }else{ 
                    res.render("forgot_pass", {message: "This link is invalid, please request another link"})     
                }
            })
            .catch((e)=>{    
                console.log("Error while comparing the unique strings  " + e)
                res.render("forgot_pass", {message: "This link is invalid, please request another link"})     
            })
            
        }else{
            res.render("forgot_pass", {message: "This link is invalid, please request another link"})
        }
        if(error){
            console.log("Error while searching for the unique string")
            res.render("forgot_pass", {message: "This link is invalid, please request another link"})
        }
    })
})  

  //new pass(modify old pass)
router.post("/pass/:email", (req, res)=>{
    let email = req.params.email//email sent parameter
    let {password, confirmpassword} = req.body  
    //console.log(req.body)
    if(password !== confirmpassword){
        res.render('reset',{         
        failMessage:"Password and confirm password must be the same, please try again"
        });   
    }else{
            console.log("aces")
            let hashedPass = bcrypt.hash(password, 8 )
            .then((hashedPass)=>{         
                db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPass,email],(error)=>{
                    if(error){     
                        console.log("Error while setting the new password ", e)     
                    }else{
                        res.render("index", {message: "Password changed successfully"})
                    }
                })
            })
            .catch((e)=>{console.log("Error while hashing the password")})  
    }
})          


router.get("/forgot_pass", (req, res)=>{
    res.render("forgot_pass");
})


router.get("/reset/:email", (req, res)=>{  
        res.render("reset", {email: req.params.email});
})

        
module.exports = router;