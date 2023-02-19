const { default: mongoose } = require("mongoose");
const {
  createS3Bucket,
  getUploadPresignedUrl,
} = require("../services/presigned-url.service");

//uplaod controller

const uploadImage = async (req, res) => {
  const { filename } = req.params;
  const UpUrl = await getUploadPresignedUrl(filename);
  res.status(200).json({ UpUrl });
};

module.exports = {
  uploadImage,
};
