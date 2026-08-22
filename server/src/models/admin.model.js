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
    let query = `
        SELECT
            id,
            role_type,
            email,
            phone,
            is_verified,
            is_active,
            last_login,
            created_at,
            updated_at
        FROM users
        WHERE 1 = 1
    `;

    const values = [];
    let parameterIndex = 1;

    if (userType) {
        query += `
            AND role_type = $${parameterIndex}
        `;

        values.push(userType);
        parameterIndex++;
    }

    if (status) {
        query += `
            AND is_active = $${parameterIndex}
        `;

        values.push(status === "active");
        parameterIndex++;
    }

    query += `
        ORDER BY created_at DESC
        LIMIT $${parameterIndex}
        OFFSET $${parameterIndex + 1}
    `;

    values.push(limit, offset);

    const result = await pool.query(query, values);

    return result.rows;
};

// ============================================================
// COUNT USERS
// ============================================================

const countUsers = async ({
    userType,
    status,
}) => {
    let query = `
        SELECT COUNT(*)::INTEGER AS total
        FROM users
        WHERE 1 = 1
    `;

    const values = [];
    let parameterIndex = 1;

    if (userType) {
        query += `
            AND role_type = $${parameterIndex}
        `;

        values.push(userType);
        parameterIndex++;
    }

    if (status) {
        query += `
            AND is_active = $${parameterIndex}
        `;

        values.push(status === "active");
    }

    const result = await pool.query(query, values);

    return result.rows[0].total;
};

// ============================================================
// FIND USER BY ID
// ============================================================

const getUserById = async (userId) => {
    const query = `
        SELECT
            id,
            role_type,
            email,
            phone,
            is_verified,
            is_active,
            last_login,
            created_at,
            updated_at
        FROM users
        WHERE id = $1
    `;

    const result = await pool.query(query, [userId]);

    return result.rows[0];
};

// ============================================================
// UPDATE USER ROLE
// ============================================================

const updateUserRole = async (
    userId,
    newRole
) => {
    const query = `
        UPDATE users
        SET
            role_type = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            role_type,
            email,
            phone,
            is_verified,
            is_active,
            last_login,
            created_at,
            updated_at
    `;

    const result = await pool.query(query, [
        userId,
        newRole,
    ]);

    return result.rows[0];
};

// ============================================================
// UPDATE USER STATUS
// ============================================================

const updateUserStatus = async (
    userId,
    isActive
) => {
    const query = `
        UPDATE users
        SET
            is_active = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            role_type,
            email,
            phone,
            is_verified,
            is_active,
            last_login,
            created_at,
            updated_at
    `;

    const result = await pool.query(query, [
        userId,
        isActive,
    ]);

    return result.rows[0];
};

module.exports = {
    getAllUsers,
    countUsers,
    getUserById,
    updateUserRole,
    updateUserStatus,
};