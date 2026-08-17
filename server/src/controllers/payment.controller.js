const paymentService = require("../services/payment.service");

// ============================================================
// GET CUSTOMER PAYMENT HISTORY
// ============================================================

const getPayments = async (req, res, next) => {
    try {
        const payments =
            await paymentService.getCustomerPayments(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            message: "Payment history fetched successfully",
            statusCode: 200,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPayments,
};