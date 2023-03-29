const express = require("express");
const jobController = require("../controller/job-controller");
const router = express.Router();

router.route("/").post(jobController.createJob).get(jobController.getAllJobs);
router.route("/status").get(jobController.showStatus);
router
  .route("/:id")
  .delete(jobController.deleteJob)
  .patch(jobController.updateJob);

module.exports = router;
