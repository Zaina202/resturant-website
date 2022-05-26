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
        const m=[req.body.m1,req.body.m2,req.body.m3,req.body.m4,req.body.m5,req.body.m6,req.body.m7,req.body.m8,req.body.m9,req.body.m10,req.body.m11,req.body.m12,req.body.m13,req.body.m14,req.body.m15,req.body.m16,
            req.body.m17,req.body.m18,req.body.m19,req.body.m20,req.body.m21,req.body.m22,req.body.m23,req.body.m24,req.body.m25]
let Bill=0;
let Order="";
let newBill=0;
db.query('SELECT price,meal FROM order_s ',(err,results)=>{
 
    if(err){
        console.log(err)
    }
    else{

    for(let i=0;i<results.length;i++){
    Bill=Bill+( m[i]*(results[i].price))
    if(m[i]>0){
            Order+=m[i]+" "+results[i].meal+" , ";
           
    }
    }
    console.log("order=",Order)

    if(Order===""||Bill===0){
        return res.render('menu',{
            message:'please select your order'   
        })
    }else{
        if(Bill>=200){
            newBill=Bill-(Bill*0.05);

            db.query('INSERT INTO bill SET?',{your_order:Order,bill:newBill},(err,results)=>{
            return res.render('menu',{
                message:`Your Order has been registered
                 , your bill = ${newBill} ₪`
            })  
        })            
        }
        else{
    db.query('INSERT INTO bill SET?',{your_order:Order,bill:Bill},(err,results)=>{
        if(err){
            console.log(err)
        }
       
        else{
            console.log(results)
                return res.render('menu',{
                message:`Your Order has been registered 
                 , your bill = ${Bill} ₪`
            })            
        }
    })

   }
}
    console.log("bill=",Bill)
    }
})



    
}
