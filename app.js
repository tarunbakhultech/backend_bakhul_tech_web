const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// MODELS
require("./models/LoginModel");
require("./models/ContactModel");

// ROUTES
const LoginRoute = require("./routes/LoginRoute");
const WebsiteInfoRoute = require("./routes/WebsiteInfoRoute");
const ContactRoute = require("./routes/ContactRoute");

app.use("/api/admin_link", LoginRoute);
app.use("/api/admin_link", WebsiteInfoRoute);
app.use("/api/admin_link", ContactRoute);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
