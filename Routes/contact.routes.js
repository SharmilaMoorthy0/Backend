const express=require('express')
const authForAdmin = require('../middleware/authForAdmin')

const auth = require('../middleware/auth')
const { Contactpage } = require('../Controller/contact.controller')
const router=express.Router()



router.post('/send/message',auth,Contactpage)




module.exports=router