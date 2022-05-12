const mysql=require("mysql")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})
// const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")
// const async = require("hbs/lib/async")

exports.deleteOrder=(req,res)=>{

 db.query('DELETE FROM bill WHERE id = (SELECT MAX(id) FROM bill)', (err, rows) => {

     if(err) {
    console.log(err);
   } 
   else {   
    console.log(rows);
    return res.render('menu',{
        message:' Your Order has been Cancelled '
    })
    }

  }); 


}
exports.readOrder=(req,res)=>{
  //const{order,bill}=req.body;
  db.query('SELECT your_order,bill FROM bill WHERE id = (SELECT MAX(id) FROM bill)', (err, rows) => {
    const{your_order,bill}=rows[0];
    console.log('The data from bill table: \n',rows);

    if (!err) {
      //res.render('menu');
      return res.render('menu',{
        message:` Your order is : ${your_order} with bill = ${bill} ₪`
    }) 
      
    } else {
      console.log(err);
      
    }
    
  });
}