const express=require('express')
const authController=require('../Controllers/auth5')

const router=express.Router()

router.post("/deleteOrder",authController.register)

module.exports=router