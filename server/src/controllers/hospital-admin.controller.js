const hospitalService = require("../services/hospital-admin.service");

// ============================================================
// GET MY HOSPITAL
// ============================================================

const getMyHospital = async (req, res, next) => {
    try {
        const hospital = await hospitalService.getMyHospital(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Hospital information fetched successfully",
            statusCode: 200,
            data: hospital,
        });
    } catch (error) {
        next(error);
    }
};

// ============================================================
// GET MY ASSIGNMENTS
// ============================================================

const getMyAssignments = async (req, res, next) => {
    try {
        const assignments = await hospitalService.getMyAssignments(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Hospital assignments fetched successfully",
            statusCode: 200,
            count: assignments.length,
            data: assignments,
        });
    } catch (error) {
        next(error);
    }
};

// ============================================================
// GET HOSPITAL DASHBOARD
// ============================================================

const getDashboard = async (req, res, next) => {
    try {
        const dashboard = await hospitalService.getDashboard(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Hospital dashboard fetched successfully",
            statusCode: 200,
            data: dashboard,
        });
    } catch (error) {
        next(error);
    }
};

// ============================================================
// GET ACTIVE CASES
// ============================================================

const getActiveCases = async (req, res, next) => {
    try {
        const activeCases = await hospitalService.getActiveCases(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "Active cases fetched successfully",
            statusCode: 200,
            data: activeCases,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyHospital,
    getMyAssignments,
    getDashboard,
    getActiveCases,
};