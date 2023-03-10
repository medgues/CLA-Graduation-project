const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
//login controller
const login = async (req, res) => {
  // const { email, password } = req.body;
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    console.log("usre", user);
    //Create jwt
    const token = generateToken(user._id);
    res.status(200).json({
      username: user.username,
      fullname: user.fullname,
      role: user.role,
      email: user.email,
      fav: user.fav,
      notif: user.notif,
      token,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const signup = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.signup(
      fullname,
      username,
      email,
      password,
      role
    );
    //Create jwt
    const token = generateToken(user._id);
    res.status(200).json({
      username: user.username,
      fullname: user.fullname,
      role: user.role,
      email: user.email,
      fav: user.fav,
      notif: user.notif,
      token,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { login, signup };
