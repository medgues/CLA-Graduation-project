const mongoose = require("mongoose");
const presignedUrlService = require("../services/presigned-url.service");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: false,
    },
    likedBy: {
      ref: "UserShcema",
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    key: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        if (ret.key) {
          ret.image_url = presignedUrlService.getUploadPresignedUrlString(
            ret.key
          );
        }
      },
    },
  }
);

module.exports = mongoose.model("ProductShcema", ProductSchema);
