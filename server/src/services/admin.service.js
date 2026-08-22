const adminModel = require("../models/admin.model");

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

module.exports = {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
};