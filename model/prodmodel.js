const mongoose = require('mongoose'); 
const productConnection = require('../db/product'); 



const aluminSchema = new mongoose.Schema({
    name:String
});



const productModel = productConnection.model('product', aluminSchema);

module.exports = productModel;
