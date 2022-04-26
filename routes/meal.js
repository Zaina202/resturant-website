const express=require('express')
const authController=require('../Controllers/auth4')

const router=express.Router()

router.post("/meal",authController.register)

module.exports=router