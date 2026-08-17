const paymentModel = require("../models/payment.model");

// ============================================================
// GET CUSTOMER PAYMENT HISTORY
// ============================================================

const getCustomerPayments = async (userId) => {
    return await paymentModel.getPaymentsByCustomerId(userId);
};

module.exports = {
    getCustomerPayments,
};