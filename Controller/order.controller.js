const Order = require("../Modal/order.schema")
const Cart = require("../Modal/cart.schema")


const newOrder = async (req, res) => {
    try {
        const { productName, Description, Price, Rating, Offerprice, client, Image,address, _id, buynow } = req.body


        let data = {
            productName,
            Description,
            Price,
            Rating,
            Offerprice,
            client,
            Image,
            address,
        }
        const saveorder = await Order.create(data)
        if (!saveorder) {
            return res.json({ status: 0, message: "order not placed" })
        }
        if (!buynow) {
            const deleteCart = await Cart.findByIdAndDelete({ _id: _id })
            if (!deleteCart) {
                return res.json({ status: 0, message: "Cart not Deleted" })
            }
        }


        res.json({ status: 1, message: "order placed successfully", })
    } catch (error) {
        console.log("order.controller.js/newOrder-->error", error)
    }
}

const AllOrders = async (req, res) => {
    try {
        const { userId } = req.User
        const allOrder = await Order.find({ client: userId })
        if (!allOrder) {
            return res.json({ status: 0, message: "orders not found" })
        }
        res.json({ status: 1, response: allOrder })
    } catch (error) {
        console.log("order.controller.js/AllOrders-->error", error)
    }
}

const DeleteOrder = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.json({ status: 0, message: "Order id requried" })
        }
        const remove = await Order.findByIdAndDelete(id, req.body)
        if (!remove) {
            return res.json({ status: 0, message: "Order not deleted" })
        }
        res.json({ status: 1, message: " Order deleted successfully" })
    } catch (error) {
        console.log("order.controller.js/DeleteOrder-->error", error)
    }
}

const editOrderAddress=async(req,res)=>{
    try {
        const { id} = req.params
      if (!id) {
         return res.json({ status: 0, message: " Order id requried" })
      }
        const update=await Order.findByIdAndUpdate(id,req.body)
        if(!update){
            return res.json({status:0 ,message:" Address not updated"})
        }
         res.json({status:1,message:"Address updated successfully"})
    } catch (error) {
        console.log("order.controller.js/editOrderAddress-->error", error)
    }
}
const editOrderAdmin=async(req,res)=>{
    try {
        const { id} = req.params
        const { address} = req.body
      if (!id) {
         return res.json({ status: 0, message: " Order id requried" })
      }
        const update=await Order.findByIdAndUpdate(id,req.body)
        if(!update){
            return res.json({status:0 ,message:" order Details not updated"})
        }
         res.json({status:1,message:"Order details updated successfully"})
    } catch (error) {
        console.log("order.controller.js/editOrderAdmin-->error", error)
    }
}

const AdminAllOrders = async (req, res) => {
    try {
        
        const AdminAllOrder = await Order.find()
        if (!AdminAllOrder) {
            return res.json({ status: 0, message: "orders not found" })
        }
        res.json({ status: 1, response: AdminAllOrder })
    } catch (error) {
        console.log("order.controller.js/AdminAllOrders-->error", error)
    }
}

module.exports = { newOrder, AllOrders, DeleteOrder ,editOrderAddress,AdminAllOrders,editOrderAdmin}