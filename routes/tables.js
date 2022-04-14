const express=require('express')
const authController=require('../Controllers/auth3')

const router=express.Router()

router.post("/tables",authController.register)

module.exports=router