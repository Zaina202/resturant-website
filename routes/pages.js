const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
 
    res.render("index")
});
router.get("/sign_up",(req,res)=>{
 
    res.render("sign_up")
});
router.get("/forgot_pass",(req,res)=>{
 
    res.render("forgot_pass")
});

router.get("/visit", (req, res)=>{
    res.render("visit")
})
router.get("/Booking", (req, res)=>{
    res.render("Booking")
})



module.exports=router