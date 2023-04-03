require("dotenv").config();
const mongoose = require("mongoose");
const fsPromises = require("fs/promises");
const Job = require("./model/job-model");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@node-project.6mr8s0d.mongodb.net/${process.env.MONGO_DB_COLLECTION}retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    await Job.deleteMany();
    const jobListJson = JSON.parse(
      await fsPromises.readFile("./mock-data.json")
    );
    await Job.create(jobListJson);
    console.log("Success!!!!");
    // process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
