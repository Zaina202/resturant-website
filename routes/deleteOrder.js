const express=require('express')
const authController=require('../Controllers/auth5')

const router=express.Router()

router.delete("/deleteOrder/:id",authController.deleteOrder)

module.exports=router