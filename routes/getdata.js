const express = require('express')
const router = express.Router()
const productModel = require('../model/prodmodel'); 

router.get('/getdata', async (req, res, next) => {
 let product = await productModel.find({});
 res.send(product)
});


module.exports = router