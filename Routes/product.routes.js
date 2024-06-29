const express=require('express')
const { newproduct, AllProducts, editProducts, DeleteProducts, ProductSearch } = require('../Controller/product.controller')
const authForAdmin = require('../middleware/authForAdmin')
const router=express.Router()
const auth = require('../middleware/auth')



router.post('/new/product',authForAdmin,newproduct)
router.post('/all/product',AllProducts)
router.post('/edit/product/:id',authForAdmin,editProducts)
router.post('/remove/product',authForAdmin,DeleteProducts)
router.post('/product/search',ProductSearch)


module.exports=router