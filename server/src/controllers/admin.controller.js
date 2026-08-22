const adminService = require("../services/admin.service");

// ============================================================
// GET ALL USERS
// ============================================================

const getAllUsers = async (req, res, next) => {
    try {
        const {
            limit = 50,
            offset = 0,
            userType,
            status,
        } = req.query;

        const result = await adminService.getAllUsers({
            limit: Number(limit),
            offset: Number(offset),
            userType,
            status,
        });

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            statusCode: 200,
            count: result.users.length,
            total: result.total,
            data: result.users,
        });
    } catch (error) {
        next(error);
    }
};

// ============================================================
// UPDATE USER ROLE
// ============================================================

const updateUserRole = async (req, res, next) => {
    try {
        const user = await adminService.updateUserRole(
            req.params.userId,
            req.body.newRole,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            statusCode: 200,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// ============================================================
// UPDATE USER STATUS
// ============================================================

const updateUserStatus = async (req, res, next) => {
    try {
        const user = await adminService.updateUserStatus(
            req.params.userId,
            req.body.status,
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            statusCode: 200,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
};