const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhlRoutes");

const app = express();

app.use(cors());
app.use(express.json());   // ✅ MUST BE HERE

app.use("/bfhl", bfhlRoutes);

module.exports = app;