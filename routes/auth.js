const express=require('express')
const authController = require('../Controllers/auth')

const router=express.Router()

router.post("/sign_up",authController.register)
router.get("/verify/:userId/:uniqueString", authController.ver)

module.exports=router