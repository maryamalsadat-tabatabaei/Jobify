const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
const jobRoutes = require("./routes/job-routes");
const userRoutes = require("./routes/user-routes");
const surveyRoutes = require("./routes/survey-routes");
const billingRoutes = require("./routes/billing-routes");
const uploadigRoutes = require("./routes/upload-routes");
const authenticateUser = require("./middleware/auth");
const localAuthRoutes = require("./routes/auth-routes/local-auth");
const googleAuthRoutes = require("./routes/auth-routes/google-auth");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const passport = require("passport");

const app = express();
// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/upload/images", express.static(path.join("upload", "images")));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,DELETE,PATCH,PUT,OPTIONS"
  );
  next();
});

app.use(passport.initialize());

require("./service/jwt-strategy");
require("./service/google-strategy");
require("./service/local-strategy");

app.use("/api/v1/auth", localAuthRoutes);
app.use("/auth/google", googleAuthRoutes);
app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/surveys", authenticateUser, surveyRoutes);
app.use("/api/v1/stripe", authenticateUser, billingRoutes);
// app.use("/api/v1/upload", authenticateUser, uploadigRoutes);

// only when ready to deploy
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@node-project.6mr8s0d.mongodb.net/${process.env.MONGO_DB_COLLECTION}retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected!");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
