const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const uploadRoutes = require("./routes/uploadRoutes");

const pool = require("./config/db");

const app = express();

const analysisRoutes = require("./routes/analysisRoutes");
const exportRoutes = require("./routes/exportRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/export", exportRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.json({
        message: "Resume screening API Running"
    });
});

pool.query("SELECT NOW()")
.then(() => {
    console.log("✅ PostgreSQl Connected");
})
.catch((err) =>  {
    console.log("❌ Database Connecion Error:", err);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});