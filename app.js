const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));

// MODELS
require("./models/LoginModel");
require("./models/ContactModel");
require("./models/FaqModel");
require("./models/TeamsModel");

// ROUTES
const LoginRoute = require("./routes/LoginRoute");
const WebsiteInfoRoute = require("./routes/WebsiteInfoRoute");
const ContactRoute = require("./routes/ContactRoute");
const FaqRoute = require("./routes/FaqRoute");
const TeamsRoute = require("./routes/TeamsRoute");

app.use("/api/admin_link", LoginRoute);
app.use("/api/admin_link", WebsiteInfoRoute);
app.use("/api/admin_link", ContactRoute);
app.use("/api/admin_link", FaqRoute);
app.use("/api/admin_link", TeamsRoute);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
