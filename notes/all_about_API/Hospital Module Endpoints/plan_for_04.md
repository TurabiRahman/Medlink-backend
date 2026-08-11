# Hospital Reservation API Specification

## 1. Get Hospital List   --- done

**Role:** All users  
**Method:** `GET`  
**Endpoint:** `/api/v1/hospitals`

### Response

```json
[
  {
    "id": "",
    "name": "",
    "beds": 12,
    "reserved_beds": 5,
    "icu": 3,
    "reserved_icu": 3
  }
]
```

## 2. Get Hospital Details  ------ done
**Role:** All users
**Method:** GET
**Endpoint:** /api/v1/hospitals/:id

### Response
```json
{
  "id": "",
  "name": "",
  "beds": 12,
  "reserved_beds": 5,
  "icu": 3,
  "reserved_icu": 3
}
```

## 3. Create Reservation    ------------- done  
**Role:** Customer
**Method:** POST
**Endpoint:** /api/v1/hospitals/:hospital_id/reservations

### Request
```json
{
  "customer_id": "",
  "hospital_id": "",
  "bed_id": "",
  ....
}
```

### Response
```json
{
  "id": "",
  "status": "pending"
  ...
}
```

## 4. Update Reservation  -----------  done
**Role:** Customer, Hospital Admin
**Method:** PATCH
**Endpoint:** /api/v1/hospitals/reservations/:id

### Request
```json
{
  
}
```
### Authorization Rules
**Hospital Admin**
- Can update any reservation belonging to their hospital.
- Can update reservation details.
- Can assign or change the assigned bed.
- Can update reservation status.

**Customer**
- Can update only their own reservation.
- Can only change the reservation status from pending to cancelled.
- Cannot change the assigned hospital or bed.

**Note:** Authorization and ownership checks must be enforced in the service layer.


## 5. Get Reservations
**Role:** Customer, Hospital Admin
**Method:** GET
**Endpoint:** /api/v1/hospitals/reservations

**Authorization Rules**
- Customer: Can only view their own reservations.
- Hospital Admin: Can only view reservations belonging to their hospital.
### Response
```json
[
  {
    "id": "",
    "customer_id": "",
    "hospital_id": "",
    "bed_id": "",
    "type": "emergency",
    "payment_status": "", // pending, completed, partially-completed
    "status": "pending" // pending, accepted, in-service, completed
  }
]
```

## 6. Get Reservation Details
**Role:** Customer, Hospital Admin
**Method:** GET
**Endpoint:** /api/v1/hospitals/reservations/:id

**Authorization Rules**
- Customer: Can only view their own reservation.
- Hospital Admin: Can only view reservations belonging to their hospital.
### Response
```json
{
  "id": "",
  "customer_id": "",
  "hospital_id": "",
  "bed_id": "",
  "status": "pending"
}
```

## 7. Get Hospital Beds
**Role:** Customer, Hospital Admin
**Method:** GET
**Endpoint:** /api/v1/hospitals/:hospital_id/beds

### Response
```json
[
  {
    "id": "",
    "name": "",
    "type": "general",
    "status": "available"
  },
  {
    "id": "",
    "name": "",
    "type": "icu",
    "status": "unavailable"
  }
]
```

**Bed Types:**
- emergency
- icu
- general

**Bed Status:**
- available
- unavailable
- disable

## 8. Add Bed
**Role:** Hospital Admin
**Method:** POST
**Endpoint:** /api/v1/hospitals/:hospital_id/beds

### Request
```json
{
  "name": "",
  "type": "general",
  "status": "available"
}
```

## 9. Update Bed
**Role:** Hospital Admin
**Method:** PATCH
**Endpoint:** /api/v1/hospitals/:hospital_id/beds/:id

### Request
```json
{
  "name": "",
  "type": "general",
  "status": "available"
}
```

Hospital Admin can update beds belonging only to their hospital.

## 10. Hospital Dashboard
**Role:** Hospital Admin
**Method:** GET
**Endpoint:** /api/v1/hospitals/:hospital_id/dashboard

### Response
For Phase 1, return only bed-related information:
```json
{
  "total_beds": 100,
  "available_beds": 60,
  "reserved_beds": 40,
  "total_icu": 10,
  "available_icu": 3,
  "reserved_icu": 7
}
```

Phase 2: Add additional hospital metrics and analytics.



UI থেকে পেমেন্ট সেকশন, ইমার্জেন্সি সেকশন রিমুভ করা যাইতে পারে। 
নর্মাল রিকুয়েস্ট আর ইমার্জেন্সি রিকুয়েস্ট আলাদা করে নেয়ার কি দরকার আছে? রিকুয়েস্ট টাইপেই দেখাবা এইটা কোন টাইপের রিকুয়েস্ট।
পেমেন্টের জন্যউ আলাদা টেবিল দেখানোর কি আছে? রিকুয়েস্ট ডিটেইলসে গেলে পেমেন্ট স্ট্যাটাস সেকশনে দেখা যাবে পেমেন্ট হইছে কি না? পেমেন্ট হয়ে গেলে পেমেন্ট ডান দিবে এডমিন। আর সার্ভিস কমপ্লিট হলে ডান করে দিবে। 

Ambulance and Blood নিয়ে আপাতত কিছু দিলাম না। ফেজ ২ এ করিও।




# Testing 

