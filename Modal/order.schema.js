const mongoose = require("mongoose")

const Orderschema = mongoose.Schema({
    productName: { type: String, requried: true },
    Description: { type: String, requried: true },
    Price: { type: Number, requried: true },
    Rating: { type: Number, requried: true },
    Image: { type: String, requried: true },
    Offerprice: { type: Number, requried: true },
    Status:{type: String, default: "Confirmed" },
    client: { type: mongoose.Types.ObjectId },
    date: { type: Date, default: Date.now },
    address: {
        Name: { type: String, requried: true },
        Line1: { type: String, requried: true },
        Line2: { type: String, requried: true },
        LandMark:{ type: String, requried: true },
        City: { type: String, requried: true },
        State: { type: String, requried: true },
        Country: { type: String, requried: true },
        Pincode: { type: Number, requried: true },



    }



}, {
    timestamps: true,
    versionKey: false
}
)
const Order = mongoose.model('Order', Orderschema)

module.exports = Order