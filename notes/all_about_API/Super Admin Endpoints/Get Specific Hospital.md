http://localhost:3000/api/v1/admin/hospitals/de213a06-70bb-4592-baec-edc2efcf0518

# res

{
    "success": true,
    "message": "Hospital details fetched successfully",
    "statusCode": 200,
    "data": {
        "id": "de213a06-70bb-4592-baec-edc2efcf0518",
        "hospital_name": "MedLife General Hospital",
        "license_number": "MED-TEST-001",
        "email": "medlife.test@example.com",
        "phone": "+8801700000001",
        "website": "https://medlife.example.com",
        "address": "Farmgate, Dhaka, Bangladesh",
        "latitude": "23.757800",
        "longitude": "90.389700",
        "hospital_status": "OPEN",
        "description": "Test hospital for MEDLINK Hospital Module API testing.",
        "created_at": "2026-08-08T18:50:03.020Z",
        "updated_at": "2026-08-08T18:50:03.020Z",
        "total_beds": 10,
        "available_beds": 5,
        "admins": [
            {
                "email": "admin.medlife@hospital.com",
                "phone": "+8801700000001",
                "user_id": "76d0ee19-b0e6-4585-8b53-89deec1e9d04",
                "is_active": true,
                "joined_at": "2026-08-13T02:04:44.260196+06:00"
            }
        ]
    }
}