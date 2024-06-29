const express=require('express')
const authForAdmin = require('../middleware/authForAdmin')

const auth = require('../middleware/auth')
const { newOrder, AllOrders, DeleteOrder, AdminAllOrders, editOrderAddress, editOrderAdmin } = require('../Controller/order.controller')
const router=express.Router()



router.post('/new/order',auth,newOrder)
router.post('/all/order',auth,AllOrders)
router.post('/admin/all/order',authForAdmin,AdminAllOrders)
router.post('/remove/order',authForAdmin,DeleteOrder)
router.post('/edit/order/address/:id',auth,editOrderAddress)
router.post('/edit/order/admin/:id',authForAdmin,editOrderAdmin)




module.exports=router