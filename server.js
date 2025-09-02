const express = require("express");
const cors = require("cors");   // ✅ Import CORS
require("dotenv").config();

const home = require('./routes/home')
const pinsert = require('./routes/pinsert')

const app = express();

app.use(cors());


app.use(express.json());

app.use('/',home)
app.use('/',pinsert)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
