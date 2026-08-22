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

// ============================================================
// GET ALL HOSPITALS
// ============================================================

const getAllHospitals = async ({
    limit,
    offset,
    status,
}) => {
    let query = `
        SELECT
            h.id,
            h.hospital_name,
            h.license_number,
            h.email,
            h.phone,
            h.website,
            h.address,
            h.latitude,
            h.longitude,
            h.hospital_status,
            h.description,
            h.created_at,
            h.updated_at,

            COUNT(DISTINCT hb.id)::INTEGER AS total_beds,

            COUNT(
                DISTINCT hb.id
            ) FILTER (
                WHERE hb.bed_status = 'AVAILABLE'
            )::INTEGER AS available_beds

        FROM hospitals h

        LEFT JOIN hospital_beds hb
            ON hb.hospital_id = h.id
    `;

    const values = [];
    let parameterIndex = 1;

    if (status) {
        query += `
            WHERE h.hospital_status = $${parameterIndex}
        `;

        values.push(status);
        parameterIndex++;
    }

    query += `
        GROUP BY h.id

        ORDER BY h.created_at DESC

        LIMIT $${parameterIndex}
        OFFSET $${parameterIndex + 1}
    `;

    values.push(limit, offset);

    const result = await pool.query(query, values);

    return result.rows;
};


// ============================================================
// COUNT HOSPITALS
// ============================================================

const countHospitals = async ({ status }) => {
    let query = `
        SELECT COUNT(*)::INTEGER AS total
        FROM hospitals
    `;

    const values = [];

    if (status) {
        query += `
            WHERE hospital_status = $1
        `;

        values.push(status);
    }

    const result = await pool.query(query, values);

    return result.rows[0].total;
};

// ============================================================
// GET HOSPITAL BY ID
// ============================================================

const getHospitalById = async (hospitalId) => {
    const query = `
        SELECT
            h.id,
            h.hospital_name,
            h.license_number,
            h.email,
            h.phone,
            h.website,
            h.address,
            h.latitude,
            h.longitude,
            h.hospital_status,
            h.description,
            h.created_at,
            h.updated_at,

            COUNT(DISTINCT hb.id)::INTEGER AS total_beds,

            COUNT(
                DISTINCT hb.id
            ) FILTER (
                WHERE hb.bed_status = 'AVAILABLE'
            )::INTEGER AS available_beds,

            json_agg(
                DISTINCT jsonb_build_object(
                    'user_id', u.id,
                    'email', u.email,
                    'phone', u.phone,
                    'is_active', u.is_active,
                    'joined_at', ha.joined_at
                )
            ) FILTER (
                WHERE u.id IS NOT NULL
            ) AS admins

        FROM hospitals h

        LEFT JOIN hospital_beds hb
            ON hb.hospital_id = h.id

        LEFT JOIN hospital_admins ha
            ON ha.hospital_id = h.id

        LEFT JOIN users u
            ON u.id = ha.user_id

        WHERE h.id = $1

        GROUP BY h.id
    `;

    const result = await pool.query(query, [
        hospitalId,
    ]);

    return result.rows[0];
};

// ============================================================
// CREATE HOSPITAL
// ============================================================

const createHospital = async (
    client,
    {
        hospitalName,
        licenseNumber,
        email,
        phone,
        website,
        address,
        latitude,
        longitude,
        hospitalStatus,
        description,
    }
) => {
    const query = `
        INSERT INTO hospitals (
            hospital_name,
            license_number,
            email,
            phone,
            website,
            address,
            latitude,
            longitude,
            hospital_status,
            description
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10
        )
        RETURNING *
    `;

    const values = [
        hospitalName,
        licenseNumber,
        email,
        phone,
        website || null,
        address,
        latitude,
        longitude,
        hospitalStatus,
        description || null,
    ];

    const result = await client.query(query, values);

    return result.rows[0];
};


// ============================================================
// CREATE HOSPITAL ADMIN USER
// ============================================================

const createHospitalAdminUser = async (
    client,
    {
        email,
        phone,
        passwordHash,
    }
) => {
    const query = `
        INSERT INTO users (
            role_type,
            email,
            phone,
            password_hash,
            is_verified,
            is_active
        )
        VALUES (
            'HOSPITAL_ADMIN',
            $1,
            $2,
            $3,
            true,
            true
        )
        RETURNING
            id,
            role_type,
            email,
            phone,
            is_verified,
            is_active,
            created_at
    `;

    const result = await client.query(query, [
        email,
        phone,
        passwordHash,
    ]);

    return result.rows[0];
};


// ============================================================
// ASSIGN ADMIN TO HOSPITAL
// ============================================================

const assignHospitalAdmin = async (
    client,
    hospitalId,
    userId
) => {
    const query = `
        INSERT INTO hospital_admins (
            hospital_id,
            user_id
        )
        VALUES ($1, $2)
        RETURNING *
    `;

    const result = await client.query(query, [
        hospitalId,
        userId,
    ]);

    return result.rows[0];
};

// ============================================================
// UPDATE HOSPITAL
// ============================================================

const updateHospital = async (
    hospitalId,
    updateData
) => {
    const fieldMap = {
        hospitalName: "hospital_name",
        licenseNumber: "license_number",
        email: "email",
        phone: "phone",
        website: "website",
        address: "address",
        latitude: "latitude",
        longitude: "longitude",
        hospitalStatus: "hospital_status",
        description: "description",
    };

    const setClauses = [];
    const values = [];
    let parameterIndex = 1;

    for (const [key, value] of Object.entries(updateData)) {
        if (
            Object.prototype.hasOwnProperty.call(
                fieldMap,
                key
            )
        ) {
            setClauses.push(
                `${fieldMap[key]} = $${parameterIndex}`
            );

            values.push(value);
            parameterIndex++;
        }
    }

    setClauses.push(
        "updated_at = CURRENT_TIMESTAMP"
    );

    values.push(hospitalId);

    const query = `
        UPDATE hospitals
        SET ${setClauses.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0];
};

// ============================================================
// DELETE HOSPITAL
// ============================================================

const deleteHospital = async (hospitalId) => {
    const query = `
        DELETE FROM hospitals
        WHERE id = $1
        RETURNING
            id,
            hospital_name
    `;

    const result = await pool.query(query, [
        hospitalId,
    ]);

    return result.rows[0];
};

module.exports = {
    getAllUsers,
    countUsers,
    getUserById,
    updateUserRole,
    updateUserStatus,
    getAllHospitals,
    countHospitals,
    getHospitalById,
    createHospital,
    createHospitalAdminUser,
    assignHospitalAdmin,
    updateHospital,
    deleteHospital,
};