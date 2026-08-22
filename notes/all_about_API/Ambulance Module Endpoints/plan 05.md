#	Endpoint	Purpose	Auth
1	GET /api/v1/ambulances/:ambulanceId	Ambulance admin dashboard/details	Bearer + AMBULANCE_ADMIN
2	PUT /api/v1/ambulances/:ambulanceId	Update ambulance information	Bearer + AMBULANCE_ADMIN
3	DELETE /api/v1/ambulances/:ambulanceId	Remove ambulance service	Bearer + AMBULANCE_ADMIN
4	PUT /api/v1/ambulances/:ambulanceId/contact	Update contact information	Bearer + AMBULANCE_ADMIN