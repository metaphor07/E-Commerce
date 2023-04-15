const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripe = require("./routes/stripe");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connection Successful...");
  })
  .catch((error) => {
    console.log(`DB Error: ${error}`);
  });

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripe);

app.listen(port, () => {
  console.log(`Server running on port no. ${port}`);
});
