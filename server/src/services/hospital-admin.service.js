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

const getHospitalBeds = async (userId) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    return hospitalModel.getBedsByHospital(
        hospital.hospital_id
    );
};

const updateHospitalBedStatus = async (
    userId,
    bedId,
    bedStatus
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    const bed = await hospitalModel.updateBedStatus(
        bedId,
        hospital.hospital_id,
        bedStatus
    );

    if (!bed) {
        const error = new Error(
            "Bed not found in your hospital"
        );
        error.statusCode = 404;
        throw error;
    }

    return bed;
};


// ============================================================
// HOSPITAL PAYMENTS
// ============================================================

const getHospitalPayments = async (userId) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    return await hospitalModel.getPaymentsByHospitalId(
        hospital.hospital_id
    );
};


const getHospitalPaymentById = async (
    userId,
    paymentId
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    const payment = await hospitalModel.getPaymentById(
        paymentId,
        hospital.hospital_id
    );

    if (!payment) {
        const error = new Error("Payment not found");
        error.statusCode = 404;
        throw error;
    }

    return payment;
};


// const createHospitalPayment = async (
//     userId,
//     {
//         reservationId,
//         totalAmount,
//         paymentMethod,
//         paymentStatus = "UNPAID",
//     }
// ) => {
//     const hospital = await hospitalModel.getHospitalByAdminId(userId);

//     if (!hospital) {
//         const error = new Error(
//             "No hospital assignment found for this admin"
//         );
//         error.statusCode = 404;
//         throw error;
//     }

//     // Make sure the reservation belongs to this hospital
//     const reservation =
//         await hospitalModel.getReservationById(
//             reservationId,
//             hospital.hospital_id
//         );

//     if (!reservation) {
//         const error = new Error(
//             "Reservation not found for this hospital"
//         );
//         error.statusCode = 404;
//         throw error;
//     }

//     // A reservation can have only one payment
//     const existingPayment =
//         await hospitalModel.getPaymentById(
//             reservation.payment_id,
//             hospital.hospital_id
//         );

//     /*
//      * We cannot rely on reservation.payment_id because the
//      * reservations table does not contain that column.
//      *
//      * The UNIQUE constraint on payments.reservation_id
//      * will protect against duplicate payments.
//      */

//     let paidAt = null;

//     if (paymentStatus === "PAID") {
//         paidAt = new Date();
//     }

//     try {
//         return await hospitalModel.createPayment({
//             reservationId,
//             totalAmount,
//             paymentMethod,
//             paymentStatus,
//             paidAt,
//         });
//     } catch (error) {
//         // PostgreSQL unique violation
//         if (error.code === "23505") {
//             const duplicateError = new Error(
//                 "A payment already exists for this reservation"
//             );
//             duplicateError.statusCode = 409;
//             throw duplicateError;
//         }

//         throw error;
//     }
// };


const createHospitalPayment = async (
    userId,
    {
        reservationId,
        totalAmount,
        paymentMethod,
        paymentStatus = "UNPAID",
    }
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
        const error = new Error(
            "Reservation not found for this hospital"
        );
        error.statusCode = 404;
        throw error;
    }

    let paidAt = null;

    if (paymentStatus === "PAID") {
        paidAt = new Date();
    }

    try {
        return await hospitalModel.createPayment({
            reservationId,
            totalAmount,
            paymentMethod,
            paymentStatus,
            paidAt,
        });
    } catch (error) {
        if (error.code === "23505") {
            const duplicateError = new Error(
                "A payment already exists for this reservation"
            );
            duplicateError.statusCode = 409;
            throw duplicateError;
        }

        throw error;
    }
};

const getPatientPayments = async (
    userId,
    patientId
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    return await hospitalModel.getPaymentsByPatientId(
        patientId,
        hospital.hospital_id
    );
};


const updateHospitalPayment = async (
    userId,
    paymentId,
    {
        totalAmount,
        paymentMethod,
        paymentStatus,
    }
) => {
    const hospital = await hospitalModel.getHospitalByAdminId(userId);

    if (!hospital) {
        const error = new Error(
            "No hospital assignment found for this admin"
        );
        error.statusCode = 404;
        throw error;
    }

    // Verify payment belongs to this hospital
    const existingPayment =
        await hospitalModel.getPaymentById(
            paymentId,
            hospital.hospital_id
        );

    if (!existingPayment) {
        const error = new Error("Payment not found");
        error.statusCode = 404;
        throw error;
    }

    let paidAt = existingPayment.paid_at;

    if (
        paymentStatus === "PAID" &&
        !existingPayment.paid_at
    ) {
        paidAt = new Date();
    }

    if (
        paymentStatus &&
        paymentStatus !== "PAID"
    ) {
        paidAt = null;
    }

    const updatedPayment =
        await hospitalModel.updatePayment(
            paymentId,
            hospital.hospital_id,
            {
                totalAmount,
                paymentMethod,
                paymentStatus,
                paidAt,
            }
        );

    return updatedPayment;
};


module.exports = {
    getMyHospital,
    getMyAssignments,
    getDashboard,
    getActiveCases,
    getHospitalReservations,
    getHospitalReservationById,
    approveHospitalReservation,
    getHospitalBeds,
    updateHospitalBedStatus,
    getHospitalPayments,
    getHospitalPaymentById,
    createHospitalPayment,
    getPatientPayments,
    updateHospitalPayment,
};

