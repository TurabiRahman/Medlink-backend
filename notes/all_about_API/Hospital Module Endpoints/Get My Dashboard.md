{
    "success": true,
    "message": "Hospital dashboard fetched successfully",
    "statusCode": 200,
    "data": {
        "hospital_id": "de213a06-70bb-4592-baec-edc2efcf0518",
        "hospital_name": "MedLife General Hospital",
        "hospital_status": "OPEN",
        "total_beds": 10,
        "available_beds": 5,
        "occupied_beds": 2,
        "maintenance_beds": 1,
        "total_icu_beds": 3,
        "pending_reservations": 0,
        "active_cases": 0
    }
}


hospital_admins
       │
       ▼
   hospitals
       │
       ├── hospital_beds
       │
       ├── hospital_wards
       │
       └── reservations
