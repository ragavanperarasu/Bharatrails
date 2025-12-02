const express = require("express");
const router = express.Router();
const productModel = require("../model/prodmodel");

router.get("/coach/:id", async (req, res, next) => {
  const coachId = req.params.id;
  let product = await productModel.find({ coachid: coachId }).limit(40).sort({ createdAt: -1 });
  if(!product){
    return res.send("Coach not found");
  }
  console.log(product);
  res.send(product);
});

module.exports = router;
