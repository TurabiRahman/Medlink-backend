const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");

const {
    getPayments,
} = require("../controllers/payment.controller");

const router = express.Router();

// ============================================================
// CUSTOMER PAYMENT HISTORY
// ============================================================


router.get(
    "/",
    authenticate,
    authorize("CUSTOMER"),
    getPayments
);

module.exports = router;