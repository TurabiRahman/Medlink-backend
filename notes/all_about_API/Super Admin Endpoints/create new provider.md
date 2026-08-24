http://localhost:3000/api/v1/admin/ambulance-providers

# req 

{
    "providerName": "Banani Emergency Ambulance",
    "providerPhone": "+8801700000091",
    "address": "Banani, Dhaka, Bangladesh",
    "latitude": 23.7937,
    "longitude": 90.4066,
    "isActive": true,

    "adminEmail": "admin.banani.ambulance@medlink.com",
    "adminPhone": "+8801700000092",
    "password": "AmbulanceAdmin123"
}

# res

{
    "success": true,
    "message": "Ambulance provider registered successfully",
    "statusCode": 201,
    "data": {
        "ambulanceProvider": {
            "id": "569ac5af-013d-49cc-adf1-168188334877",
            "provider_name": "Banani Emergency Ambulance",
            "phone": "+8801700000091",
            "address": "Banani, Dhaka, Bangladesh",
            "latitude": "23.793700",
            "longitude": "90.406600",
            "is_active": true,
            "created_at": "2026-08-24T12:28:46.687Z",
            "updated_at": "2026-08-24T12:28:46.687Z"
        },
        "adminUser": {
            "id": "05f569d8-800f-4baf-bca5-a62795159d60",
            "role_type": "AMBULANCE_ADMIN",
            "email": "admin.banani.ambulance@medlink.com",
            "phone": "+8801700000092",
            "is_verified": true,
            "is_active": true,
            "created_at": "2026-08-24T12:28:46.687Z"
        },
        "ambulanceAdmin": {
            "id": "80b8f382-04a4-455e-9a56-87721441d3f3",
            "ambulance_provider_id": "569ac5af-013d-49cc-adf1-168188334877",
            "user_id": "05f569d8-800f-4baf-bca5-a62795159d60",
            "joined_at": "2026-08-24T12:28:46.687Z"
        }
    }
}

