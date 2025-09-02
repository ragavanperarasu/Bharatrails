const mongoose = require('mongoose'); 
const productConnection = require('../db/product'); 



const aluminSchema = new mongoose.Schema({
    coachid: { type: String, required: true },
    pribat: { type: Number, default: 0 },
    backbat: { type: Number, default: 0 },
    pripow: { type: Boolean, default: false },
    maintainance: { type: Boolean, default: false },
    lat: { type: String },
    lng: { type: String },
    sig: { type: Number, default: 0 }
}, { timestamps: true }); 



const productModel = productConnection.model('product', aluminSchema);

module.exports = productModel;
