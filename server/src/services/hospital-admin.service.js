const hospitalModel = require("../models/hospital-admin.model");

// ============================================================
// GET MY HOSPITAL
// ============================================================

const getMyHospital = async (userId) => {
    const hospital = await hospitalModel.getId(userId);

    if (!hospital) {
        const error = new Error("No hospital assignment found");
        error.statusCode = 404;
        throw error;
    }

    return hospital;
};

// ============================================================
// GET MY ASSIGNMENTS
// ============================================================

const getMyAssignments = async (userId) => {
    return await hospitalModel.getAssignmentsByAdminId(userId);
};

// ============================================================
// GET HOSPITAL DASHBOARD
// ============================================================

const getDashboard = async (userId) => {
    const dashboard = await hospitalModel.getDashboardByAdminId(userId);

    if (!dashboard) {
        const error = new Error("No hospital assignment found");
        error.statusCode = 404;
        throw error;
    }

    return dashboard;
};

// ============================================================
// GET ACTIVE CASES
// ============================================================

const getActiveCases = async (userId) => {
    const hospital = await hospitalModel.getHospitalIdByAdminId(userId);

    if (!hospital) {
        const error = new Error("No hospital assignment found");
        error.statusCode = 404;
        throw error;
    }

    return await hospitalModel.getActiveCasesByHospitalId(
        hospital.hospital_id
    );
};


// ----------------> we will code for reservations from now

const getHospitalReservations = async (userId) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    const reservations =
        await hospitalModel.getReservationsByHospital(
            hospital.hospital_id
        );

    return reservations;
};


const getHospitalReservationById = async (
    userId,
    reservationId
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    const reservation =
        await hospitalModel.getReservationById(
            reservationId,
            hospital.hospital_id
        );

    if (!reservation) {
        const error = new Error("Reservation not found");
        error.statusCode = 404;
        throw error;
    }

    return reservation;
};


const approveHospitalReservation = async (
    userId,
    reservationId
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    return hospitalModel.approveReservation(
        reservationId,
        hospital.hospital_id
    );
};

module.exports = {
    getMyHospital,
    getMyAssignments,
    getDashboard,
    getActiveCases,
    getHospitalReservations,
    getHospitalReservationById,
    approveHospitalReservation,
};