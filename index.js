const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/routers/route");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(multer().any());

app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_LINK_USERID}:${process.env.MONGODB_LINK_PASSWORD}.n1nevi5.mongodb.net/${process.env.MONGODB_COLLECTION_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));
console.log(process.env.MONGODB_LINK_USERID);

app.use("/", route);
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Our First Project running On PORT " + (process.env.PORT || 3000)
  );
});
