const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const ambulanceRoutes = require("./routes/ambulance.routes");
const eventRoutes = require("./routes/event.routes");
const reservationRoutes = require("./routes/reservation.routes");
const aiMedicalRoutes = require("./routes/ai-medical.routes");
const hospitalAdminRoutes = require("./routes/hospital-admin.routes");
const paymentRoutes = require("./routes/payment.routes");




const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hospitals", hospitalRoutes);
app.use("/api/v1/ambulances", ambulanceRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/ai-medical",aiMedicalRoutes);
app.use("/api/v1/hospital",hospitalAdminRoutes);
app.use("/api/v1/payments", paymentRoutes);






module.exports = app;