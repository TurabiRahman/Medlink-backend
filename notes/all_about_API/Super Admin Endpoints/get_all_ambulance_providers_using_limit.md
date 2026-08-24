http://localhost:3000/api/v1/admin/ambulance-providers?limit=2&offset=0

{
    "success": true,
    "message": "Ambulance providers fetched successfully",
    "statusCode": 200,
    "total": 5,
    "limit": 2,
    "offset": 0,
    "count": 2,
    "data": [
        {
            "id": "277303c9-b0a8-44a0-bcb9-87baee8cab10",
            "provider_name": "Uttara Rapid Ambulance",
            "phone": "+8801700000013",
            "address": "Uttara, Dhaka, Bangladesh",
            "latitude": "23.875900",
            "longitude": "90.379500",
            "is_active": true,
            "created_at": "2026-08-08T21:16:55.909Z",
            "updated_at": "2026-08-08T21:16:55.909Z"
        },
        {
            "id": "0febcf49-2bc6-4015-825f-074bd48cff1b",
            "provider_name": "MedLife Ambulance Service",
            "phone": "+8801700000012",
            "address": "Farmgate, Dhaka, Bangladesh",
            "latitude": "23.757800",
            "longitude": "90.389700",
            "is_active": true,
            "created_at": "2026-08-08T21:16:55.909Z",
            "updated_at": "2026-08-08T21:16:55.909Z"
        }
    ]
}