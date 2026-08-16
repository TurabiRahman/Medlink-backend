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


/// ------------> we will write code for reservation


const getReservationsByHospital = async (hospitalId) => {
    const query = `
        SELECT
            r.id AS reservation_id,
            r.medical_event_id,
            r.user_id,
            r.hospital_id,
            r.ward_id,
            r.bed_id,
            r.reservation_mode,
            r.reservation_status,
            r.requested_at,
            r.approved_at,
            r.created_at,
            r.updated_at,

            me.user_description,
            me.severity,
            me.event_status,
            me.is_emergency,
            me.event_location_latitude,
            me.event_location_longitude,

            hw.ward_name,

            hb.bed_number,
            hb.bed_status

        FROM reservations r

        INNER JOIN medical_events me
            ON r.medical_event_id = me.id

        INNER JOIN hospital_wards hw
            ON r.ward_id = hw.id

        LEFT JOIN hospital_beds hb
            ON r.bed_id = hb.id

        WHERE r.hospital_id = $1

        ORDER BY r.requested_at DESC;
    `;

    const { rows } = await pool.query(query, [hospitalId]);

    return rows;
};


const getReservationById = async (reservationId, hospitalId) => {
    const query = `
        SELECT
            r.id AS reservation_id,
            r.medical_event_id,
            r.user_id,
            r.hospital_id,
            r.ward_id,
            r.bed_id,
            r.reservation_mode,
            r.reservation_status,
            r.requested_at,
            r.approved_at,
            r.created_at,
            r.updated_at,

            me.user_description,
            me.severity,
            me.event_status,
            me.is_emergency,
            me.event_location_latitude,
            me.event_location_longitude,

            hw.ward_name,
            hw.description AS ward_description,

            hb.bed_number,
            hb.bed_status

        FROM reservations r

        INNER JOIN medical_events me
            ON r.medical_event_id = me.id

        INNER JOIN hospital_wards hw
            ON r.ward_id = hw.id

        LEFT JOIN hospital_beds hb
            ON r.bed_id = hb.id

        WHERE r.id = $1
          AND r.hospital_id = $2

        LIMIT 1;
    `;

    const { rows } = await pool.query(query, [
        reservationId,
        hospitalId,
    ]);

    return rows[0] || null;
};


const approveReservation = async (reservationId, hospitalId) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        /*
         * Lock the reservation so two hospital admins/processes
         * cannot approve it simultaneously.
         */
        const reservationResult = await client.query(
            `
            SELECT
                id,
                hospital_id,
                ward_id,
                bed_id,
                reservation_status
            FROM reservations
            WHERE id = $1
              AND hospital_id = $2
            FOR UPDATE;
            `,
            [reservationId, hospitalId]
        );

        if (reservationResult.rows.length === 0) {
            const error = new Error("Reservation not found");
            error.statusCode = 404;
            throw error;
        }

        const reservation = reservationResult.rows[0];

        if (reservation.reservation_status !== "PENDING") {
            const error = new Error(
                "Only pending reservations can be approved"
            );
            error.statusCode = 400;
            throw error;
        }

        if (!reservation.bed_id) {
            const error = new Error(
                "Reservation does not have a bed assigned"
            );
            error.statusCode = 400;
            throw error;
        }

        /*
         * Lock the bed as well.
         */
        const bedResult = await client.query(
            `
            SELECT
                id,
                hospital_id,
                ward_id,
                bed_status
            FROM hospital_beds
            WHERE id = $1
              AND hospital_id = $2
              AND ward_id = $3
            FOR UPDATE;
            `,
            [
                reservation.bed_id,
                hospitalId,
                reservation.ward_id,
            ]
        );

        if (bedResult.rows.length === 0) {
            const error = new Error(
                "Assigned bed was not found"
            );
            error.statusCode = 404;
            throw error;
        }

        const bed = bedResult.rows[0];

        // if (bed.bed_status !== "AVAILABLE") {
        //     const error = new Error(
        //         "Assigned bed is not available"
        //     );
        //     error.statusCode = 400;
        //     throw error;
        // }

        

        /*
         * Mark the bed as RESERVED.
         *
         * The patient has a reservation now, but has not
         * necessarily occupied the bed yet.
         */
        await client.query(
            `
            UPDATE hospital_beds
            SET
                bed_status = 'RESERVED',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1;
            `,
            [reservation.bed_id]
        );

        /*
         * Approve the reservation.
         */
        const updatedReservationResult = await client.query(
            `
            UPDATE reservations
            SET
                reservation_status = 'APPROVED',
                approved_at = CURRENT_TIMESTAMP,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING
                id AS reservation_id,
                medical_event_id,
                user_id,
                hospital_id,
                ward_id,
                bed_id,
                reservation_mode,
                reservation_status,
                requested_at,
                approved_at,
                created_at,
                updated_at;
            `,
            [reservationId]
        );

        await client.query("COMMIT");

        return updatedReservationResult.rows[0];

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

const getBedsByHospital = async (hospitalId) => {
    const query = `
        SELECT
            hb.id AS bed_id,
            hb.bed_number,
            hb.bed_status,
            hw.id AS ward_id,
            hw.ward_name,
            hb.created_at,
            hb.updated_at
        FROM hospital_beds hb
        JOIN hospital_wards hw
            ON hw.id = hb.ward_id
        WHERE hb.hospital_id = $1
        ORDER BY hw.ward_name, hb.bed_number
    `;

    const { rows } = await pool.query(query, [hospitalId]);

    return rows;
};

const updateBedStatus = async (
    bedId,
    hospitalId,
    bedStatus
) => {
    const query = `
        UPDATE hospital_beds
        SET
            bed_status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
          AND hospital_id = $3
        RETURNING
            id AS bed_id,
            hospital_id,
            ward_id,
            bed_number,
            bed_status,
            created_at,
            updated_at
    `;

    const { rows } = await pool.query(query, [
        bedStatus,
        bedId,
        hospitalId,
    ]);

    return rows[0] || null;
};

module.exports = {
    getHospitalIdByAdminId,
    getHospitalByAdminId,
    getAssignmentsByAdminId,
    getDashboardByAdminId,
    getActiveCasesByHospitalId,
    getReservationsByHospital,
    getReservationById,
    approveReservation,
    getBedsByHospital,
    updateBedStatus,
};