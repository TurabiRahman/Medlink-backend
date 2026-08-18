const ambulanceService = require("../services/ambulance-admin.service");

// ============================================================
// GET AMBULANCE
// ============================================================

const getAmbulance = async (req, res, next) => {
    try {
        const ambulance =
            await ambulanceService.getAmbulance(
                req.params.ambulanceId
            );

        return res.status(200).json({
            success: true,
            message: "Ambulance information fetched successfully",
            statusCode: 200,
            data: ambulance,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// UPDATE AMBULANCE
// ============================================================

const updateAmbulance = async (req, res, next) => {
    try {
        const ambulance =
            await ambulanceService.updateAmbulance(
                req.params.ambulanceId,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Ambulance information updated successfully",
            statusCode: 200,
            data: ambulance,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// DELETE AMBULANCE
// ============================================================

const deleteAmbulance = async (req, res, next) => {
    try {
        const result =
            await ambulanceService.deleteAmbulance(
                req.params.ambulanceId
            );

        return res.status(200).json({
            success: true,
            message: "Ambulance provider removed successfully",
            statusCode: 200,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// UPDATE CONTACT
// ============================================================

const updateAmbulanceContact = async (req, res, next) => {
    try {
        const ambulance =
            await ambulanceService.updateAmbulanceContact(
                req.params.ambulanceId,
                req.body.phone
            );

        return res.status(200).json({
            success: true,
            message: "Ambulance contact updated successfully",
            statusCode: 200,
            data: ambulance,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAmbulance,
    updateAmbulance,
    deleteAmbulance,
    updateAmbulanceContact,
};