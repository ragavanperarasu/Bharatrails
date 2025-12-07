const express = require("express");
const router = express.Router();
const productModel = require("../model/prodmodel");

router.get("/coachloc/:id", async (req, res, next) => {
  try {
    const coachId = req.params.id;

    const product = await productModel
      .find(
        {
          coachid: coachId,
        },
        { lat: 1, lng: 1, createdAt: 1, _id: 0 } // projection
      )
      .limit(800)
      .sort({ createdAt: -1 });

    if (!product || product.length === 0) {
      return res.send("Coach not found");
    }

    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
