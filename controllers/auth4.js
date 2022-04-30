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
let bill=0;
db.query('SELECT price FROM order_s ',(err,results)=>{
    console.log("m=", m[0])
    if(err){
        console.log(err)
    }else{
    console.log("res=",results[0].price)

    for(let i=0;i<10;i++)
    bill=bill+( m[i]*(results[i].price))
    console.log("bill=",bill)
    }
})



    
}
console.log("meal")