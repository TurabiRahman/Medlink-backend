http://localhost:3000/api/v1/events/EVENT_UUID 

{
    "success": true,
    "message": "Medical event details fetched successfully",
    "statusCode": 200,
    "data": {
        "id": "EVENT_UUID",
        "user_id": "USER_UUID",
        "user_description": "Patient has severe chest pain",
        "event_location_latitude": 23.810333,
        "event_location_longitude": 90.412523,
        "severity": "HIGH",
        "event_status": "PENDING",
        "is_emergency": true,
        "created_at": "2026-08-10T09:00:00.000Z",
        "updated_at": "2026-08-10T09:00:00.000Z",
        "phone": "+8801712345604",
        "first_name": "Fariha",
        "last_name": null,
        "hospitals": [],
        "ambulances": []
    }
}