const express=require('express')
const router=express.Router()
const app=express();
app.set('view engine','hbs')

const mysql=require("mysql") 

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})

router.get("/",(req,res)=>{
 
    res.render("index")
});
router.get("/sign_up",(req,res)=>{
 
    res.render("sign_up")
});
router.get("/profile",(req,res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    
    db.query('SELECT *FROM users WHERE id = ?', [req.session.user], (error, result)=>{
        res.render("profile", {name: result[0].First_name,
        lastName: result[0].Last_name,
    email:result[0].email})

    })
}

});

router.get("/index",(req,res)=>{
 
    res.render("index")
});
router.get("/forgot_pass",(req,res)=>{
 
    res.render("forgot_pass")
});

router.get("/visit", (req, res)=>{
    res.render("visit")
})
router.get("/home", (req, res)=>{
    res.render("home")
})

router.get("/Booking", (req, res)=>{
    res.render("Booking")
})

 router.get("/tables", (req, res)=>{
    res.render("Booking")
 })
 router.get("/discount", (req, res)=>{
    res.render("discount")
 })
 router.get("/menu", (req, res)=>{
    res.render("menu")
 })
 router.get("/imgMenu", (req, res)=>{
    res.render("imgMenu")
 })


router.get("/reset", (req, res)=>{
    res.render("reset")
 }) 
module.exports=router