const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  getBloodDonors,
  getBloodDonorById,
} = require("../controllers/blood.controller");

const {
  donorListQuerySchema,
  donorIdParamSchema,
} = require("../validations/blood.validation");


router.get(
  "/donors",
  authenticate,
  authorize("CUSTOMER"),
  validate(donorListQuerySchema, "query"),
  getBloodDonors
);


router.get(
  "/donors/:donorId",
  authenticate,
  authorize("CUSTOMER"),
  validate(donorIdParamSchema, "params"),
  getBloodDonorById
);


module.exports = router;