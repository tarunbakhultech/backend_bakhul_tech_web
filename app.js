const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const productRoute = require("./routes/products");
const contactUsRoute = require("./routes/contact");
const connectDB = require("./db/connect");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// API Routes
app.use("/api/products", productRoute);
app.use("/api/admin_link", contactUsRoute);

app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting the server:', error);
    }
};

startServer();
