const mysql=require("mysql")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {v4:uuidv4}=require('uuid')
const sendEmail = require("../verification")


const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")
const async = require("hbs/lib/async")

exports.register=(req,res)=>{
    console.log(req.body)
    const{FName,LName,email,password,confirmPassword}=req.body
    db.query('SELECT email FROM users WHERE email=?',[email],async(err,results)=>{
        if(err){
            console.log(err)
        }
        if(results.length>0){
            return res.render('sign_up',{
                message:'The email is already in use'

            })

        }else if(password!==confirmPassword){
            return res.render('sign_up',{
                message:'Passwords do not match'
            })   
        }else if(FName===""||LName===""||email===""||password===""||confirmPassword===""){
            return res.render('sign_up',{
                message:'Please enter your information'   
            })
        }else{
        let hashedpassword=await bcrypt.hash(password,8)
            db.query('INSERT INTO users SET?',{First_name:FName,Last_name:LName,email:email,password:hashedpassword},(err,results)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(results)
        }
            });
        }

        db.query('SELECT ID FROM users WHERE email=?',[email],async (error, result)=>{
            if(error){
                console.log(err)
            }
            else{
                sendEmail.emailVer(email, result[0].ID)
                return res.render('index',{
                    message:'Succesfully! account has created '
                })
            }
        })


    });

}

exports.ver =async (req, res)=>{
    console.log(`Id ${req.params.userId}`)
    console.log(`String : ${req.params.uniqueString}`)
    let {userId, uniqueString} = req.params;
    await db.query("SELECT uniqueString FROM verification WHERE userId=?", [userId], async (err, result)=>{
        if(err){
            console.log(err +"error while verefication")
        }else{
            console.log(uniqueString)
            console.log("Router accessd")
            console.log("DB result " +result[0].uniqueString)
            if(result[0].uniqueString==uniqueString){
                console.log("compared")
                await db.query("UPDATE users SET verifid = '1' WHERE users.ID = ?", [userId], (error,result)=>{
                    console.log("11")
                    if(error){
                        console.log(error + "Error while verifying the user")
                    }else{
                        console.log('1')
                        db.query("DELETE FROM verification WHERE userId = ?",[userId], (error)=>{
                            if(error){
                                console.log("Error occured while deleting the string", error); 
                            }
                            res.render('index',{
                                message:'Veriefied Succesfully!'
                            })  
                        })
                    }
                })
            }else{
                res.send("REquest another email")
            }
        }
    })
}


