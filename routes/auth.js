const express=require('express')
const authController=require('../Controllers/auth')

const router=express.Router()

router.post("/sign_up",authController.register)

module.exports=router