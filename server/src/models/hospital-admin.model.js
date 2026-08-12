const pool = require("../config/db");

// ============================================================
// GET HOSPITAL ID BY ADMIN ID
// ============================================================

const getHospitalIdByAdminId = async (userId) => {
    const query = `
        SELECT
            hospital_id

        FROM hospital_admins

        WHERE user_id = $1;
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// ============================================================
// GET MY HOSPITAL
// ============================================================

const getHospitalByAdminId = async (userId) => {
    const query = `
        SELECT
            h.id AS hospital_id,
            h.hospital_name AS name,
            h.latitude::double precision AS latitude,
            h.longitude::double precision AS longitude,

            COUNT(DISTINCT b.id)::integer AS total_beds,

            COUNT(DISTINCT b.id) FILTER (
                WHERE w.ward_name ILIKE '%ICU%'
            )::integer AS total_icu_beds

        FROM hospital_admins ha

        INNER JOIN hospitals h
            ON h.id = ha.hospital_id

        LEFT JOIN hospital_beds b
            ON b.hospital_id = h.id

        LEFT JOIN hospital_wards w
            ON w.id = b.ward_id

        WHERE ha.user_id = $1

        GROUP BY
            h.id,
            h.hospital_name,
            h.latitude,
            h.longitude;
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// ============================================================
// GET MY ASSIGNMENTS
// ============================================================

const getAssignmentsByAdminId = async (userId) => {
    const query = `
        SELECT
            ha.id AS assignment_id,
            h.id AS hospital_id,
            h.hospital_name AS hospital_name,
            h.license_number,
            h.email,
            h.phone,
            h.address,
            h.latitude::double precision AS latitude,
            h.longitude::double precision AS longitude,
            h.hospital_status,
            ha.joined_at

        FROM hospital_admins ha

        INNER JOIN hospitals h
            ON h.id = ha.hospital_id

        WHERE ha.user_id = $1

        ORDER BY ha.joined_at DESC;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
};

// ============================================================
// GET HOSPITAL DASHBOARD
// ============================================================

const getDashboardByAdminId = async (userId) => {
    const query = `
        SELECT
            h.id AS hospital_id,
            h.hospital_name AS hospital_name,
            h.hospital_status,

            COUNT(DISTINCT b.id)::integer AS total_beds,

            COUNT(DISTINCT b.id) FILTER (
                WHERE b.bed_status = 'AVAILABLE'
            )::integer AS available_beds,

            COUNT(DISTINCT b.id) FILTER (
                WHERE b.bed_status = 'OCCUPIED'
            )::integer AS occupied_beds,

            COUNT(DISTINCT b.id) FILTER (
                WHERE b.bed_status = 'MAINTENANCE'
            )::integer AS maintenance_beds,

            COUNT(DISTINCT b.id) FILTER (
                WHERE w.ward_name ILIKE '%ICU%'
            )::integer AS total_icu_beds,

            COUNT(DISTINCT r.id) FILTER (
                WHERE r.reservation_status = 'PENDING'
            )::integer AS pending_reservations,

            COUNT(DISTINCT CASE
                WHEN me.event_status NOT IN ('COMPLETED', 'CANCELLED')
                THEN me.id
            END)::integer AS active_cases

        FROM hospital_admins ha

        INNER JOIN hospitals h
            ON h.id = ha.hospital_id

        LEFT JOIN hospital_beds b
            ON b.hospital_id = h.id

        LEFT JOIN hospital_wards w
            ON w.id = b.ward_id

        LEFT JOIN reservations r
            ON r.hospital_id = h.id

        LEFT JOIN event_hospitals eh
            ON eh.hospital_id = h.id

        LEFT JOIN medical_events me
            ON me.id = eh.medical_event_id

        WHERE ha.user_id = $1

        GROUP BY
            h.id,
            h.hospital_name,
            h.hospital_status;
    `;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

// ============================================================
// GET ACTIVE CASES
// ============================================================

const getActiveCasesByHospitalId = async (hospitalId) => {
    const query = `
        SELECT
            me.id AS event_id,
            me.user_id,
            me.user_description,
            me.event_location_latitude::double precision
                AS event_location_latitude,
            me.event_location_longitude::double precision
                AS event_location_longitude,
            me.severity,
            me.event_status,
            me.is_emergency,
            me.created_at,
            me.updated_at

        FROM event_hospitals eh

        INNER JOIN medical_events me
            ON me.id = eh.medical_event_id

        WHERE
            eh.hospital_id = $1
            AND me.event_status NOT IN (
                'COMPLETED',
                'CANCELLED'
            )

        ORDER BY
            me.created_at DESC;
    `;

    const result = await pool.query(query, [hospitalId]);

    return result.rows;
};

module.exports = {
    getHospitalIdByAdminId,
    getHospitalByAdminId,
    getAssignmentsByAdminId,
    getDashboardByAdminId,
    getActiveCasesByHospitalId,
};