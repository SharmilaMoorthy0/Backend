const { response } = require("express")
const Plants = require("../Modal/product.schema")
const newproduct = async (req, res) => {
    try {
        const { productName, Description, Rating, Offerprice, Price, Image } = req.body


        let data = {
            productName,
            Description,
            Rating,
            Offerprice,
            Price,
            Image,

        }
        const saveProduct = await Plants.create(data)
        if (!saveProduct) {
            return res.json({ status: 0, message: " product not created" })
        }
        res.json({ status: 1, message: "product created successfully" })
    } catch (error) {
        console.log("product.controller.js/newproduct-->error", error)
    }
}

const AllProducts = async (req, res) => {
    try {
        const allproduct = await Plants.find()
        if (!allproduct) {
            return res.json({ status: 0, message: "products not found" })
        }
        res.json({ status: 1, response: allproduct })
    } catch (error) {
        console.log("product.controller.js/AllProducts-->error", error)
    }
}

const editProducts = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.json({ status: 0, message: "product  id requried" })
        }
        const update = await Plants.findByIdAndUpdate(id, req.body)
        if (!update) {
            return res.json({ status: 0, message: "product not updated" })
        }
        res.json({ status: 1, message: "product updated successfully" })
    } catch (error) {
        console.log("product.controller.js/editProducts-->error", error)
    }
}

const DeleteProducts = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.json({ status: 0, message: "product id requried" })
        }
        const remove = await Plants.findByIdAndDelete(id, req.body)
        if (!remove) {
            return res.json({ status: 0, message: "product not deleted" })
        }
        res.json({ status: 1, message: "product deleted successfully" })
    } catch (error) {
        console.log("product.controller.js/DeleteProducts-->error", error)
    }
}
const ProductSearch=async(req,res)=>{
    try {
        const { query } = req.body;
        const results = await Plants.find({
            $or: [
              { productName: { $regex: query, $options: 'i' } }, // Case-insensitive search on productName
            //   { description: { $regex: query, $options: 'i' } } // Case-insensitive search on description
            ]
          });
          res.json({ status: 1,response: results });
        } catch (error) {
           console.log("product.controller.js/ProductSearch-->error", error)
        }
      }

module.exports = { newproduct, AllProducts, editProducts, DeleteProducts ,ProductSearch}
