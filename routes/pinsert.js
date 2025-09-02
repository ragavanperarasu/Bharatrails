const express = require('express')
const router = express.Router()
const productModel = require('../model/prodmodel'); 

router.post('/proins', async (req, res, next) => {
    console.log(req.body)
 res.send("successfull");
});


module.exports = router