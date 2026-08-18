const ambulanceModel = require("../models/ambulance-admin.model");

// ============================================================
// GET AMBULANCE
// ============================================================

const getAmbulance = async (ambulanceId) => {
    const ambulance =
        await ambulanceModel.getAmbulanceById(ambulanceId);

    if (!ambulance) {
        const error = new Error("Ambulance provider not found");
        error.statusCode = 404;
        throw error;
    }

    return ambulance;
};


// ============================================================
// UPDATE AMBULANCE
// ============================================================

const updateAmbulance = async (
    ambulanceId,
    data
) => {
    const existingAmbulance =
        await ambulanceModel.getAmbulanceById(ambulanceId);

    if (!existingAmbulance) {
        const error = new Error("Ambulance provider not found");
        error.statusCode = 404;
        throw error;
    }

    try {
        return await ambulanceModel.updateAmbulance(
            ambulanceId,
            data
        );
    } catch (error) {
        // PostgreSQL unique violation
        if (error.code === "23505") {
            const duplicateError = new Error(
                "Phone number is already in use"
            );

            duplicateError.statusCode = 409;
            throw duplicateError;
        }

        throw error;
    }
};


// ============================================================
// DELETE AMBULANCE
// ============================================================

const deleteAmbulance = async (ambulanceId) => {
    const existingAmbulance =
        await ambulanceModel.getAmbulanceById(ambulanceId);

    if (!existingAmbulance) {
        const error = new Error("Ambulance provider not found");
        error.statusCode = 404;
        throw error;
    }

    await ambulanceModel.deleteAmbulance(ambulanceId);

    return {
        ambulanceId,
    };
};


// ============================================================
// UPDATE CONTACT
// ============================================================

const updateAmbulanceContact = async (
    ambulanceId,
    phone
) => {
    const existingAmbulance =
        await ambulanceModel.getAmbulanceById(ambulanceId);

    if (!existingAmbulance) {
        const error = new Error("Ambulance provider not found");
        error.statusCode = 404;
        throw error;
    }

    try {
        return await ambulanceModel.updateAmbulanceContact(
            ambulanceId,
            phone
        );
    } catch (error) {
        if (error.code === "23505") {
            const duplicateError = new Error(
                "Phone number is already in use"
            );

            duplicateError.statusCode = 409;
            throw duplicateError;
        }

        throw error;
    }
};


module.exports = {
    getAmbulance,
    updateAmbulance,
    deleteAmbulance,
    updateAmbulanceContact,
};