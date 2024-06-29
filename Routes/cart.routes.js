const express=require('express')
const { newCart, AllCarts, DeleteCart } = require('../Controller/cart.controller')
const auth = require('../middleware/auth')
const router=express.Router()



router.post('/new/cart',newCart)
router.post('/all/cart',auth,AllCarts)

router.post('/remove/cart',DeleteCart)


module.exports=router