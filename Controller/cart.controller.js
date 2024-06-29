const Cart = require("../Modal/cart.schema")


const newCart= async (req, res) => {
    try {
       const { productName,Description,Price,Rating,Offerprice,client,Image} = req.body
       
      
       let data={
        productName,
        Description,
        Price,
        Rating,
        Offerprice,
        client,
        Image,
       }
       const saveProduct=await Cart.create(data)
       if(!saveProduct) {
          return res.json({ status: 0, message: " not Added to cart" })
       }
       res.json({ status: 1, message: "Added to cart" })
    } catch (error) {
       console.log("cart.controller.js/newCart-->error", error)
    }
 }

 const AllCarts= async(req,res) =>{
    try {
       const{userId}=req.User
        const allcart=await Cart.find({client:userId})
        if(!allcart){
            return res.json({ status: 0, message: "carts not found" })
        }
        res.json({ status: 1, response:allcart })
    } catch (error) {
        console.log("cart.controller.js/AllCarts-->error", error)
    }
 }

 const DeleteCart=async(req,res)=>{
    try {
        const{id}=req.body
        if(!id){
           return res.json({status:0 ,message:"cart id requried"})
        }
        const remove=await Cart.findByIdAndDelete(id,req.body)
        if(!remove){
            return res.json({status:0 ,message:"cart not deleted"})
        }
         res.json({status:1 ,message:"cart deleted successfully"})
    } catch (error) {
        console.log("cart.controller.js/DeleteCart-->error", error)
    }
}

module.exports={newCart,AllCarts,DeleteCart}