http://localhost:3000/api/v1/admin/hospitals

# req 

{
    "hospital": {
        "hospitalName": "Dhaka Medical Center",
        "licenseNumber": "DMC-2026-001",
        "email": "info@dhakamedicalcenter.com",
        "phone": "+8801700000011",
        "website": "https://dhakamedicalcenter.com",
        "address": "Dhaka, Bangladesh",
        "latitude": 23.8103,
        "longitude": 90.4125,
        "hospitalStatus": "OPEN",
        "description": "A multi-specialty medical center."
    },
    "admin": {
        "email": "admin@dhakamedicalcenter.com",
        "phone": "+8801700000012",
        "password": "AdminPassword123"
    }
}

# res

{
    "success": true,
    "message": "Hospital and hospital admin created successfully",
    "statusCode": 201,
    "data": {
        "hospital": {
            "id": "e073ca60-7a8f-4810-9451-a5879f2ad344",
            "hospital_name": "Dhaka Medical Center",
            "license_number": "DMC-2026-001",
            "email": "info@dhakamedicalcenter.com",
            "phone": "+8801700000011",
            "website": "https://dhakamedicalcenter.com",
            "address": "Dhaka, Bangladesh",
            "latitude": "23.810300",
            "longitude": "90.412500",
            "hospital_status": "OPEN",
            "description": "A multi-specialty medical center.",
            "created_at": "2026-08-22T20:44:10.160Z",
            "updated_at": "2026-08-22T20:44:10.160Z"
        },
        "admin": {
            "id": "d5bfb0d5-db73-42e4-878f-a0db8b852b81",
            "role_type": "HOSPITAL_ADMIN",
            "email": "admin@dhakamedicalcenter.com",
            "phone": "+8801700000012",
            "is_verified": true,
            "is_active": true,
            "created_at": "2026-08-22T20:44:10.160Z"
        },
        "assignment": {
            "id": "76d16013-9f70-4372-b2c2-9ae193537831",
            "hospital_id": "e073ca60-7a8f-4810-9451-a5879f2ad344",
            "user_id": "d5bfb0d5-db73-42e4-878f-a0db8b852b81",
            "joined_at": "2026-08-22T20:44:10.160Z"
        }
    }
}