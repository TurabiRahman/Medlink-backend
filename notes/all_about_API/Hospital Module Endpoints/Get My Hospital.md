http://localhost:3000/api/v1/hospital/my-hospital

# res

{
    "success": true,
    "message": "Hospital information fetched successfully",
    "statusCode": 200,
    "data": {
        "hospital_id": "de213a06-70bb-4592-baec-edc2efcf0518",
        "name": "MedLife General Hospital",
        "latitude": 23.7578,
        "longitude": 90.3897,
        "total_beds": 10,
        "total_icu_beds": 3
    }
}


hospital_admins
      │
      │ hospital_id
      ▼
  hospitals
      │
      ├── hospital_beds
      │
      └── hospital_wards