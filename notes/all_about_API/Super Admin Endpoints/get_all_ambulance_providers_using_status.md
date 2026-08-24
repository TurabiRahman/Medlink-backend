http://localhost:3000/api/v1/admin/ambulance-providers?status=inactive

# res 

{
    "success": true,
    "message": "Ambulance providers fetched successfully",
    "statusCode": 200,
    "total": 1,
    "limit": 50,
    "offset": 0,
    "count": 1,
    "data": [
        {
            "id": "b067de85-4075-4416-a7b1-409b51c3349a",
            "provider_name": "Inactive Test Ambulance",
            "phone": "+8801700000015",
            "address": "Dhanmondi, Dhaka, Bangladesh",
            "latitude": "23.746500",
            "longitude": "90.376000",
            "is_active": false,
            "created_at": "2026-08-08T21:16:55.909Z",
            "updated_at": "2026-08-08T21:16:55.909Z"
        }
    ]
}

