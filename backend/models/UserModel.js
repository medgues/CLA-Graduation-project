const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: true,
    },

    fav: {
      ref: "ProductShcema",
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (
  fullname,
  username,
  email,
  password,
  role
) {
  // validate email
  if (!validator.isEmail(email)) {
    throw Error("email must be valid");
  }
  //validate password strenth
  if (!validator.isStrongPassword(password)) {
    throw Error("password must be valid");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("email alrady exsists");
  }
  const usernameExsists = await this.findOne({ username });
  if (usernameExsists) {
    throw Error("username alrady exsists");
  }
  //salt
  const salt = await bcrypt.genSalt(12);
  //hashed password
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    fullname,
    username,
    email,
    password: hashedPassword,
    role,
  });
  return user;
};
UserSchema.statics.login = async function (email, password) {
  if (!email | !password) {
    throw Error("must provide Credentials");
  }

  // validate email
  if (!validator.isEmail(email)) {
    throw Error("email must be valid");
  }

  const user = await this.findOne({ email }).populate("fav");
  if (!user) {
    throw Error("Incorrect Credentials");
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    throw Error("Incorrect Credentials");
  }

  return user;
};
module.exports = mongoose.model("UserShcema", UserSchema);
