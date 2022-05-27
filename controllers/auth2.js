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
    const email=req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM users WHERE email = ? ", [email], (error, results) => {
        if (error) {
          throw error;
        }
        if(email===''||password===''){
          return res.render('index',{
            message:'plese enter your email and password'   
        })
        }
        else{
        if (results.length  && bcrypt.compareSync(password,results[0].password)) {
          req.session.user = results[0].id ;

          return res.render("home",{
              message:false
          });
        } else {
          return res.render("index", {
            message: "Password or email is incorrect"
          });
        }
      }
    }
    );
  

}
