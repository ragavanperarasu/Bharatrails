const mongoose = require('mongoose'); 
const productConnection = require('../db/product'); 



const MqttSchema = new mongoose.Schema({
    topic: String,
    message: String,
    deviceId: String,
    createdAt: { type: Date, default: Date.now }
});



const mqttproductModel = productConnection.model('mqttproduct', MqttSchema);

module.exports = mqttproductModel;
