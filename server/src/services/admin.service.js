const bcrypt = require("bcrypt");
const adminModel = require("../models/admin.model");
const pool = require("../config/db");

// ============================================================
// GET ALL USERS
// ============================================================

const getAllUsers = async ({
    limit,
    offset,
    userType,
    status,
}) => {
    const users = await adminModel.getAllUsers({
        limit,
        offset,
        userType,
        status,
    });

    const total = await adminModel.countUsers({
        userType,
        status,
    });

    return {
        users,
        total,
    };
};

// ============================================================
// UPDATE USER ROLE
// ============================================================

const updateUserRole = async (
    userId,
    newRole,
    adminUserId
) => {
    const user = await adminModel.getUserById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    // Prevent a Super Admin from changing their own role
    if (userId === adminUserId) {
        const error = new Error(
            "You cannot change your own role"
        );
        error.statusCode = 400;
        throw error;
    }

    return await adminModel.updateUserRole(
        userId,
        newRole
    );
};

// ============================================================
// UPDATE USER STATUS
// ============================================================

const updateUserStatus = async (
    userId,
    status,
    adminUserId
) => {
    const user = await adminModel.getUserById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    // Prevent a Super Admin from disabling themselves
    if (userId === adminUserId) {
        const error = new Error(
            "You cannot change your own account status"
        );
        error.statusCode = 400;
        throw error;
    }

    const isActive = status === "active";

    return await adminModel.updateUserStatus(
        userId,
        isActive
    );
};

// ============================================================
// GET ALL HOSPITALS
// ============================================================

const getAllHospitals = async ({
    limit,
    offset,
    status,
}) => {
    const hospitals =
        await adminModel.getAllHospitals({
            limit,
            offset,
            status,
        });

    const total =
        await adminModel.countHospitals({
            status,
        });

    return {
        hospitals,
        total,
    };
};

// ============================================================
// GET HOSPITAL DETAILS
// ============================================================

const getHospitalById = async (hospitalId) => {
    const hospital =
        await adminModel.getHospitalById(hospitalId);

    if (!hospital) {
        const error = new Error("Hospital not found");
        error.statusCode = 404;
        throw error;
    }

    return hospital;
};

// ============================================================
// CREATE HOSPITAL
// ============================================================

const createHospital = async ({
    hospital,
    admin,
}) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 1. Create hospital
        const createdHospital =
            await adminModel.createHospital(
                client,
                hospital
            );

        // 2. Hash admin password
        const passwordHash = await bcrypt.hash(
            admin.password,
            10
        );

        // 3. Create hospital admin user
        const createdAdmin =
            await adminModel.createHospitalAdminUser(
                client,
                {
                    email: admin.email,
                    phone: admin.phone,
                    passwordHash,
                }
            );

        // 4. Assign admin to hospital
        const assignment =
            await adminModel.assignHospitalAdmin(
                client,
                createdHospital.id,
                createdAdmin.id
            );

        await client.query("COMMIT");

        return {
            hospital: createdHospital,
            admin: createdAdmin,
            assignment,
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

// ============================================================
// UPDATE HOSPITAL
// ============================================================

const updateHospital = async (
    hospitalId,
    updateData
) => {
    const existingHospital =
        await adminModel.getHospitalById(hospitalId);

    if (!existingHospital) {
        const error = new Error("Hospital not found");
        error.statusCode = 404;
        throw error;
    }

    const updatedHospital =
        await adminModel.updateHospital(
            hospitalId,
            updateData
        );

    return updatedHospital;
};

// ============================================================
// DELETE HOSPITAL
// ============================================================

const deleteHospital = async (hospitalId) => {
    const existingHospital =
        await adminModel.getHospitalById(hospitalId);

    if (!existingHospital) {
        const error = new Error("Hospital not found");
        error.statusCode = 404;
        throw error;
    }

    return await adminModel.deleteHospital(
        hospitalId
    );
};

module.exports = {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    getAllHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    deleteHospital,
};