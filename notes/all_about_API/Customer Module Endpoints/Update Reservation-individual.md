http://localhost:3000/api/v1/reservations/ce386a31-d912-4901-ba05-371a7b07fb42

# req

{
    "hospitalId": "5f43be45-6d23-4990-801c-4ca945536807",
    "wardId": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
    "bedId": "fe1f70e3-d699-4283-94c3-b7587ea3fae7"
}


# res

{
    "success": true,
    "message": "Reservation updated successfully",
    "statusCode": 200,
    "data": {
        "id": "ce386a31-d912-4901-ba05-371a7b07fb42",
        "medical_event_id": "a3b19dcc-05c0-4e6f-a963-d35b34d22e1f",
        "user_id": "80da2d49-fb18-47f8-8584-689574e8e274",
        "hospital_id": "5f43be45-6d23-4990-801c-4ca945536807",
        "ward_id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
        "bed_id": "fe1f70e3-d699-4283-94c3-b7587ea3fae7",
        "reservation_mode": "NORMAL",
        "reservation_status": "PENDING",
        "requested_at": "2026-08-10T12:43:29.496Z",
        "approved_at": null,
        "created_at": "2026-08-10T12:43:29.496Z",
        "updated_at": "2026-08-10T13:46:20.315Z"
    }
}