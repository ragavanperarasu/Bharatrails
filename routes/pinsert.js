const express = require('express');
const router = express.Router();
const productModel = require('../model/prodmodel'); 

router.post('/proins', async (req, res) => {
    const { coachid, pribat, backbat, pripow, maintainance, lat, lng, sig } = req.body;
    try {
        

        if (!coachid) {
            return res.status(400).json({ error: "coachid is required" });
        }

        const updatedProduct = await productModel.findOne({coachid:coachid})
        // const updatedProduct = await productModel.findOneAndUpdate(
        //     { coachid },             // filter by coachid
        //     { pribat, backbat, pripow, maintainance, lat, lng, sig }, // data to update
        //     { new: true, upsert: true } // create if not exists, return updated document
        // );

        res.status(200).send(updatedProduct)
    }
        catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
