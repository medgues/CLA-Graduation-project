require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/Users");
const uploadRouter = require("./routes/preSignedUrl");
const productsRouter = require("./routes/Products");
const { createS3Bucket } = require("./services/presigned-url.service");
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/preUrl", uploadRouter);
app.use("/api/products", productsRouter);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.port}`);
  createS3Bucket();
});
