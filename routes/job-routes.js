const express = require("express");
const jobController = require("../controller/job-controller");
const router = express.Router();

router
  .route("/")
  .post(
    // fileUpload.single("imageUrl"),
    // [
    //   check("company").not().isEmpty(),
    //   check("position").not().isEmpty(),
    //   check("description").isLength({ min: 5 }),
    //   check("jobLocation").not().isEmpty(),
    // ],
    jobController.createJob
  )
  .get(jobController.getAllJobs);
router.route("/status").get(jobController.showStatus);
router
  .route("/:id")
  .delete(jobController.deleteJob)
  .patch(jobController.updateJob);

module.exports = router;
