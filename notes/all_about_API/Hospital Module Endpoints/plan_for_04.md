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


# let's stat building the app

Phase 4

1. Hospital information
GET /api/v1/hospital/my-hospital
GET /api/v1/hospital/my-assignments
GET /api/v1/hospital/dashboard
GET /api/v1/hospital/dashboard/active-cases

All require:

Bearer token
authenticate
authorize("HOSPITAL_ADMIN")

2. Reservation management
GET /api/v1/hospital/reservations
GET /api/v1/hospital/reservations/:reservationId
PUT /api/v1/hospital/reservations/:reservationId/approve

These will work with my existing:

reservations
medical_events
users
hospitals
hospital_wards
hospital_beds

tables.

3. Bed management
GET /api/v1/hospital/beds
PUT /api/v1/hospital/beds/:bedId/status

These will use my existing:

hospital_beds
hospital_wards
hospitals

tables.

4. Hospital payments
GET /api/v1/hospital/payments
GET /api/v1/hospital/payments/:paymentId
POST /api/v1/hospital/payments
GET /api/v1/hospital/payments/patient/:patientId
PUT /api/v1/hospital/payments/:paymentId

5. Customer payment history

GET /api/v1/payments

Auth Required — Customer

This would return payment records belonging to the authenticated customer.

And optionally:

GET /api/v1/payments/:paymentId

Auth Required — Customer

for viewing one specific payment.

The important security rule will be:

A customer must only be able to see their own payments.

They should not be able to request another customer's payment simply by changing the paymentId.



# Hospital Information

hospitals
    │
    │ hospital_id
    ▼
event_hospitals
    │
    │ medical_event_id
    ▼
medical_events