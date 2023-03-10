const { default: mongoose } = require("mongoose");
const ProductsModel = require("../models/ProductsModel");
const UserModel = require("../models/UserModel");

const AddProductToFav = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("productId is not valid objectID");
    }

    const product = await ProductsModel.findById(productId);
    if (product.likedBy.includes(userId)) {
      const userIndex = product.likedBy.indexOf(userId);
      product.likedBy.splice(userIndex, 1);

      await product.save();

      const user = await UserModel.findById(userId);
      const productIndex = user.fav.indexOf(productId);
      user.fav.splice(productIndex, 1);

      await user.save();

      const products = await ProductsModel.find({}).populate(
        "likedBy",
        "username -_id"
      );
      res.status(200).json(products);
    } else {
      product.likedBy = [...product.likedBy, userId];

      await product.save();
      const user = await UserModel.findById(userId);
      console.log(user);
      user.fav = [...user.fav, productId];

      await user.save();

      const userToNotify = await UserModel.findOne({
        username: product.postedBy,
      });
      console.log("user", userToNotify);
      userToNotify.notif = [
        ...userToNotify.notif,
        { notifProduct: productId, seen: false },
      ];
      await userToNotify.save();

      const products = await ProductsModel.find({}).populate(
        "likedBy",
        "username -_id"
      );
      res.status(200).json(products);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { AddProductToFav };
