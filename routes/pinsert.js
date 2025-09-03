const express = require('express');
const router = express.Router();
const productModel = require('../model/prodmodel'); 

router.post('/proins', async (req, res) => {
    const { coachid, pribat, backbat, pripow, maintainance, lat, lng, sig } = req.body;

    try {
        if (!coachid || !pribat) {
            return res.status(400).json({ error: "coachid is required" });
        }
        
        let product = await productModel.findOne({ coachid });

        if (!product) {
         
            product = await productModel.create({
                coachid,
                pribat,
                backbat,
                pripow,
                maintainance,
                lat,
                lng,
                sig
            });
            return res.status(201).json({ message: "New product inserted", product });
        } else {
          
            product.pribat = pribat;
            product.backbat = backbat;
            product.pripow = pripow;
            product.maintainance = maintainance;
            product.lat = lat;
            product.lng = lng;
            product.sig = sig;

            const updatedProduct = await product.save();
            return res.status(200).send("done");
        }

    } catch (err) {
        console.error("Error in /proins:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
