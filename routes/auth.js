const express=require('express')
const authController=require('../Controllers/auth')

const router=express.Router()

router.post("/sign_up",authController.register)
router.post("/index",authController.register)


module.exports=router