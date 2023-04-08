// const AWS = require("aws-sdk");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const s3 = new AWS.S3({
//   region: "us-east-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// s3.createBucket(
//   {
//     Bucket: "jobify-images-bucket",
//   },
//   (error, success) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(success);
//     }
//   }
// );

// exports.getUploadSignedUrl = async (req, res, next) => {
//   const key = `${req.user.userId}/${uuidv4()}.jpeg`;
//   const presignedUrl = await s3
//     .getSignedUrl("putObject", {
//       Bucket: "jobify-images-bucket",
//       ContentType: "image/jpeg",
//       Key: key,
//     })
//     .promise();
//   res.status(200).json({ key, presignedUrl });
// };
