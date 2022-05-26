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
const async = require("hbs/lib/async")

exports.register=(req,res)=>{

    console.log(req.body)
    const{Time,customers,num,Note}=req.body
   
    db.query('SELECT * FROM tables WHERE  time=?',[Time],(err,results)=>{
      if(err){
            console.log(err)
        }
         if(results.length > 20 ){
           
                db.query('DELETE FROM tables WHERE time = ?', [Time], (err, rows) => {
                    if(err){
                   console.log(err)
                        }
                });
                    return res.render('Booking',{
                        message:'The restaurant is full at this time'
                    })
                           
            
            }
        if(Time===""||num===""||customers===""){
            return res.render('Booking',{
                message:'plese enter your information'   
            })
        }
         else{
         db.query('INSERT INTO tables SET?',{time:Time,num_of_people:customers,phone_num:num,note:Note},(err,results)=>{
                 if(err){
                     console.log(err)
                 }
                 else{
                     console.log(results)
                 }
                    
        res.render("menu")
     });
        } 
  
       
    });           




    


}

console.log('hiii');
