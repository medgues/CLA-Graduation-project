const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const User = require("../models/UserModel");

const checkAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("authorization", authorization);
  console.log("headers", req.headers);
  if (!authorization) {
    return res.status(400).json({ err: "authorization headers missing!" });
  }
  const token = authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await UserModel.findById({ _id }).select("username");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = checkAuth;
