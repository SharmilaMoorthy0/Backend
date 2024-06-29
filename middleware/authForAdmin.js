const jwt = require('jsonwebtoken')
const User = require('../Modal/user.schema')


const authForAdmin =  (req, res, next) => {
    try {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, "ABCD123", async function (err, decode) {
                if(err){
                    return res.json({status:0,message:"invalid token"})
                }
                const checkUser = await User.findOne({ Email: decode.Email })
                if (!checkUser) {
                    return res.json("invalid user/Token")
                }
                if(checkUser.role==="admin"){
                    req.User = decode
                    next()
                }
                else{
                    return res.json({status:0,message:"you are not authorized"})
                }
               
            })
            

        }
        else {
            res.json({ status: "00", message: "unAuthorized" })
        }
    } catch (error) {
        console.log('authForAdmin.js', error)
    }
}

module.exports = authForAdmin