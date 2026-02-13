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
    mlat: { type: String },
    mlng: { type: String },
    sig: { type: Number, default: 0 },
    expiresAt: { type: Date, default: Date.now, expires: 604800 }
}, { timestamps: true });

const productModel = productConnection.model('product', aluminSchema);

productModel.collection.createIndex({ coachid: 1, createdAt: -1 });

module.exports = productModel;
