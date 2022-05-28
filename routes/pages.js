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
router.get("/home", (req, res)=>{
    if(!req.session.user){

        res.render('index')
    }else{
    
        db.query('SELECT *FROM users WHERE id = ?', [req.session.user], (error, result)=>{
            res.render("home", {name: result[0].First_name})
    
        })
    }
    
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

router.get("/logout",(req,res)=>{
    res.render("index")
    req.session.destroy();
 
});

router.get("/forgot_pass",(req,res)=>{
    
 
    res.render("forgot_pass")
});

router.get("/visit", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("visit")}
})


router.get("/Booking", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("Booking")}
})

 router.get("/tables", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("Booking")}
 })
 router.get("/discount", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("discount")}
 })
 router.get("/menu", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("menu")}
 })
 router.get("/imgMenu", (req, res)=>{
    if(!req.session.user){

        res.render('index')
}else{
    res.render("imgMenu")}
 })


router.get("/reset", (req, res)=>{
    res.render("reset")
 }) 
module.exports=router