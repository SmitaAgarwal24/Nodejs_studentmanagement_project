
const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();
const userRouter = require("./user.router");
const { checkToken } = require("./auth");

app.use(express.json());

app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log("server up and running on PORT :", port);
});
