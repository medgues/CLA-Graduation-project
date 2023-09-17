const AWS = require("aws-sdk");
const crypto = require("crypto");
let S3Client;

const configurateAWS = () => {
  console.log("configure aws called");
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION_DEFAULT,
    signatureVersion: "v4",
  });
};

const createS3Bucket = async () => {
  console.log("create bucket envoked");
  if (!S3Client) {
    configurateAWS();
    S3Client = new AWS.S3();
    // return new Promise((resolve, reject) => {
    //   S3Client.
    //   S3Client.createBucket(
    //     { Bucket: process.env.AWS_BUCKET_NAME },
    //     function (err, data) {
    //       if (err) reject(err);
    //       else {
    //         resolve(data);
    //       }
    //     }
    //   );
    // });
  }
};

const getUploadPresignedUrl = async (filename, oldKey) => {
  console.log("reached", filename);
  const key =
    oldKey ||
    crypto.randomBytes(24).toString("hex") + (filename ? "-" + filename : "");
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return {
    put: S3Client.getSignedUrl("putObject", { ...params, Expires: 3600 }),
    get: S3Client.getSignedUrl("getObject", { ...params, Expires: 3600 }),
    key,
  };
};

const deleteS3Object = async (key) => {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return new Promise((resolve, reject) => {
    S3Client.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getUploadPresignedUrlString = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return S3Client.getSignedUrl("getObject", { ...params, Expires: 3600 });
};

module.exports = {
  createS3Bucket,
  configurateAWS,
  getUploadPresignedUrl,
  deleteS3Object,
  getUploadPresignedUrlString,
};
