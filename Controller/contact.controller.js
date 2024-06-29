const Contact = require("../Modal/contact.schema")
const User = require("../Modal/user.schema")

const Contactpage = async (req, res) => {
    try {
        const { name, Email, message } = req.body
        const checkEmail = await User.findOne({ Email: Email })
        if (checkEmail) {
            return res.json({ status: 0, message: "email already taken" })
        }

        let data = {
            name,
            Email,
            message
        }
        const saveUser = await Contact.create(data)
        if (!saveUser) {
            return res.json({ status: 0, message: "message not send" })
        }
        res.json({ status: 1, message: "Message send successfully" })
    } catch (error) {
        console.log("contact.controller.js/Contactpage-->error", error)
    }
}
module.exports={Contactpage}