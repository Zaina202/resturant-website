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
    const{m1,M1,m2,M2,m3,M3,m4,M4,m5,M5,m6,M6,m7,M7,m8,M8,m9,M9,m10,M10,m11,M11,m12,M12,m13,M13,m14,M14,m15,M15,m16,M16,
        m17,M17,m18,M18,m19,M19,m20,M20,m21,M21,m22,M22,m23,M23,m24,M24,m25,M25}=req.body

db.query('SELECT * FROM order_s ',(err,results)=>{
    if(err){
        console.log(err)
    }else{
        console.log("res=",results[0])
    }
})



    
}
console.log("meal")