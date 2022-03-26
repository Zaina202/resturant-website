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
    const email=req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM users WHERE email = ? ", [email], (error, results) => {
        if (error) {
          throw error;
        }
        if (results.length  && bcrypt.compareSync(password,results[0].password)) {
          return res.render("home",{
              message:false
          });
        } else {
          return res.render("index", {
            message: "password or email is incorrect"
          });
        }
      }
    );
  

}