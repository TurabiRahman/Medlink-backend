const pool = require("../config/db");

// ============================================================
// CREATE MEDICAL EVENT
// ============================================================

const createMedicalEvent = async ({
    userId,
    userDescription,
    latitude,
    longitude,
    severity,
    isEmergency,
}) => {

    const query = `
        INSERT INTO medical_events (
            user_id,
            user_description,
            event_location_latitude,
            event_location_longitude,
            severity,
            event_status,
            is_emergency
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            'PENDING',
            $6
        )
        RETURNING
            id,
            user_id,
            user_description,
            event_location_latitude,
            event_location_longitude,
            severity,
            event_status,
            is_emergency,
            created_at,
            updated_at;
    `;

    const result = await pool.query(query, [
        userId,
        userDescription,
        latitude,
        longitude,
        severity,
        isEmergency,
    ]);

    return result.rows[0];
};


// ============================================================
// CREATE AI RESPONSE
// ============================================================

const createAIResponse = async ({
    medicalEventId,
    summary,
    possibleConditions,
    tags,
    firstAid,
}) => {

    const query = `
        INSERT INTO ai_responses (
            medical_event_id,
            summary,
            possible_conditions,
            tags,
            first_aid
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING
            id,
            medical_event_id,
            summary,
            possible_conditions,
            tags,
            first_aid,
            created_at;
    `;

    const result = await pool.query(query, [
        medicalEventId,
        summary,
        possibleConditions,
        tags,
        firstAid,
    ]);

    return result.rows[0];
};


// ============================================================
// GET AI RESPONSE BY MEDICAL EVENT
// ============================================================

const getAIResponseByEventId = async (medicalEventId) => {

    const query = `
        SELECT
            id,
            medical_event_id,
            summary,
            possible_conditions,
            tags,
            first_aid,
            created_at

        FROM ai_responses

        WHERE medical_event_id = $1;
    `;

    const result = await pool.query(query, [
        medicalEventId,
    ]);

    return result.rows[0] || null;
};


module.exports = {
    createMedicalEvent,
    createAIResponse,
    getAIResponseByEventId,
};