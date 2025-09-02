const express = require('express')
const router = express.Router()
require("dotenv").config();

router.get('/', async (req, res, next) => {
 res.send(`<h1>Bharatrails Server Working</h1>`);
});


module.exports = router