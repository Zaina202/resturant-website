const express=require('express')
const authController=require('../Controllers/auth5')

const router=express.Router()

router.post("/deleteOrder",authController.deleteOrder)
router.get("/deleteOrder",authController.readOrder)

module.exports=router