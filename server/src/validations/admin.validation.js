const { z } = require("zod");

// ============================================================
// UPDATE USER ROLE
// ============================================================

const updateUserRoleSchema = z.object({
    newRole: z.enum(
        [
            "CUSTOMER",
            "SUPER_ADMIN",
            "HOSPITAL_ADMIN",
            "AMBULANCE_ADMIN",
        ],
        {
            message: "Invalid user role",
        }
    ),
});

// ============================================================
// UPDATE USER STATUS
// ============================================================

const updateUserStatusSchema = z.object({
    status: z.enum(
        ["active", "inactive"],
        {
            message: "Status must be either active or inactive",
        }
    ),
});

module.exports = {
    updateUserRoleSchema,
    updateUserStatusSchema,
};