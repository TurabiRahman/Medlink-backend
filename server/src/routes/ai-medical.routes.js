const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const {
    consult,
} = require("../controllers/ai-medical.controller");

const {
    aiMedicalConsultSchema,
} = require("../validations/ai-medical.validation");


// ============================================================
// POST AI MEDICAL CONSULTATION
// ============================================================

router.post(
    "/consult",
    authenticate,
    validate(aiMedicalConsultSchema),
    consult
);


module.exports = router;