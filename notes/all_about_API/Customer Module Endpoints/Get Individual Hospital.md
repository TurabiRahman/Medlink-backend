# res 

{
    "success": true,
    "message": "Hospital details fetched successfully",
    "statusCode": 200,
    "data": {
        "id": "5f43be45-6d23-4990-801c-4ca945536807",
        "hospital_name": "Dhaka Care Hospital",
        "license_number": "DCH-TEST-001",
        "email": "dhakacare.test@example.com",
        "phone": "+8801700000002",
        "website": "https://dhakacare.example.com",
        "address": "Gulshan, Dhaka, Bangladesh",
        "latitude": 23.7925,
        "longitude": 90.4078,
        "hospital_status": "OPEN",
        "description": "Test hospital for MEDLINK nearby hospital testing.",
        "created_at": "2026-08-08T18:50:03.020Z",
        "updated_at": "2026-08-08T18:50:03.020Z",
        "wards": [
            {
                "id": "306b5028-d296-4f40-b9ac-c4e7b2fc630a",
                "ward_name": "General Ward",
                "description": "General patient ward.",
                "total_beds": 4,
                "available_beds": 3,
                "occupied_beds": 1,
                "reserved_beds": 0,
                "maintenance_beds": 0
            },
            {
                "id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                "ward_name": "ICU",
                "description": "Intensive Care Unit.",
                "total_beds": 4,
                "available_beds": 2,
                "occupied_beds": 1,
                "reserved_beds": 0,
                "maintenance_beds": 1
            },
            {
                "id": "67191868-2f72-4dcd-b1d9-adb9e6b01a1c",
                "ward_name": "Pediatric Ward",
                "description": "Ward for pediatric patients.",
                "total_beds": 2,
                "available_beds": 1,
                "occupied_beds": 1,
                "reserved_beds": 0,
                "maintenance_beds": 0
            }
        ],
        "beds": [
            {
                "id": "ecaad54d-f2a5-4e67-80c9-0c4ea20a1cad",
                "ward_id": "306b5028-d296-4f40-b9ac-c4e7b2fc630a",
                "bed_number": "G-01",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "cec6f10d-5793-45be-92e4-4fcb7f2fd5a5",
                "ward_id": "306b5028-d296-4f40-b9ac-c4e7b2fc630a",
                "bed_number": "G-02",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "ef0f593e-ada0-479c-a445-5f0b27a7e420",
                "ward_id": "306b5028-d296-4f40-b9ac-c4e7b2fc630a",
                "bed_number": "G-03",
                "bed_status": "OCCUPIED",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "9bd65457-f216-45cb-b23f-2aaab16754c8",
                "ward_id": "306b5028-d296-4f40-b9ac-c4e7b2fc630a",
                "bed_number": "G-04",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "2b779124-51e4-4405-a384-6511b53fe132",
                "ward_id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                "bed_number": "ICU-01",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "fe1f70e3-d699-4283-94c3-b7587ea3fae7",
                "ward_id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                "bed_number": "ICU-02",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "05aeb799-2f31-45a3-85c3-eebce0966887",
                "ward_id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                "bed_number": "ICU-03",
                "bed_status": "OCCUPIED",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "ef596a18-515a-4c31-bf66-f72b26c62313",
                "ward_id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                "bed_number": "ICU-04",
                "bed_status": "MAINTENANCE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "4dde3405-13a0-49e8-9de0-29b0181309b6",
                "ward_id": "67191868-2f72-4dcd-b1d9-adb9e6b01a1c",
                "bed_number": "P-01",
                "bed_status": "AVAILABLE",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            },
            {
                "id": "824f9616-f37b-40d3-abf3-4e958142d12c",
                "ward_id": "67191868-2f72-4dcd-b1d9-adb9e6b01a1c",
                "bed_number": "P-02",
                "bed_status": "OCCUPIED",
                "created_at": "2026-08-08T18:50:17.782Z",
                "updated_at": "2026-08-08T18:50:17.782Z"
            }
        ],
        "icu": {
            "totalBeds": 4,
            "availableBeds": 2,
            "occupiedBeds": 1,
            "reservedBeds": 0,
            "maintenanceBeds": 1,
            "wards": [
                {
                    "id": "811f89fa-2e3b-4f7e-ace3-1e9c155e7649",
                    "ward_name": "ICU",
                    "description": "Intensive Care Unit.",
                    "total_beds": 4,
                    "available_beds": 2,
                    "occupied_beds": 1,
                    "reserved_beds": 0,
                    "maintenance_beds": 1
                }
            ]
        }
    }
}