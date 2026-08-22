http://localhost:3000/api/v1/events

http://localhost:3000/api/v1/events?limit=20&offset=0

# res

If you currently have no rows in medical_events:

{
    "success": true,
    "message": "Medical events fetched successfully",
    "statusCode": 200,
    "count": 0,
    "data": []
}

Once events exist, you'll get:

{
    "success": true,
    "message": "Medical events fetched successfully",
    "statusCode": 200,
    "count": 1,
    "data": [
        {
            "id": "EVENT-UUID",
            "user_id": "USER-UUID",
            "user_description": "Patient has severe chest pain",
            "event_location_latitude": 23.810333,
            "event_location_longitude": 90.412523,
            "severity": "HIGH",
            "event_status": "PENDING",
            "is_emergency": true,
            "created_at": "2026-08-10T09:00:00.000Z",
            "updated_at": "2026-08-10T09:00:00.000Z",
            "first_name": "Fariha",
            "last_name": null,
            "phone": "+8801712345604"
        }
    ]
}

