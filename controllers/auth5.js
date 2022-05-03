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

 db.query('DELETE FROM bill WHERE id = ?', [req.params.id], (err, rows) => {

     if(err) {
    console.log(err);
   } 
   else {   
    console.log(rows);
    return res.render('menu',{
        message:'Your Order has been cancelled '
    })
    }

  }); 
  




}