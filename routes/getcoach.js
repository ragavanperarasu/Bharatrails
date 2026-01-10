const express = require("express");
const router = express.Router();
const productModel = require("../model/prodmodel");

router.get("/coach/:id", async (req, res, next) => {
  try {
    const coachId = req.params.id;

    // pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const skip = (page - 1) * limit;

    const product = await productModel
      .find({ coachid: coachId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!product || product.length === 0) {
      return res.status(404).send("Coach not found");
    }

    res.json({
      page,
      limit,
      count: product.length,
      data: product
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
