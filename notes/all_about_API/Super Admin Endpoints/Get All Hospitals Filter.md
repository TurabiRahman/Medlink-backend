http://localhost:3000/api/v1/admin/hospitals?limit=10&offset=0&status=OPEN

# res

{
    "success": true,
    "message": "Hospitals fetched successfully",
    "statusCode": 200,
    "count": 3,
    "total": 3,
    "data": [
        {
            "id": "313e41be-ca87-4cb7-a8cd-87275babadf5",
            "hospital_name": "Emergency Care Hospital",
            "license_number": "ECH-TEST-001",
            "email": "emergencycare.test@example.com",
            "phone": "+8801700000003",
            "website": "https://emergencycare.example.com",
            "address": "Uttara, Dhaka, Bangladesh",
            "latitude": "23.875900",
            "longitude": "90.379500",
            "hospital_status": "OPEN",
            "description": "Test emergency hospital for MEDLINK API testing.",
            "created_at": "2026-08-08T18:50:03.020Z",
            "updated_at": "2026-08-08T18:50:03.020Z",
            "total_beds": 8,
            "available_beds": 6
        },
        {
            "id": "5f43be45-6d23-4990-801c-4ca945536807",
            "hospital_name": "Dhaka Care Hospital",
            "license_number": "DCH-TEST-001",
            "email": "dhakacare.test@example.com",
            "phone": "+8801700000002",
            "website": "https://dhakacare.example.com",
            "address": "Gulshan, Dhaka, Bangladesh",
            "latitude": "23.792500",
            "longitude": "90.407800",
            "hospital_status": "OPEN",
            "description": "Test hospital for MEDLINK nearby hospital testing.",
            "created_at": "2026-08-08T18:50:03.020Z",
            "updated_at": "2026-08-08T18:50:03.020Z",
            "total_beds": 10,
            "available_beds": 5
        },
        {
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
            "available_beds": 5
        }
    ]
}