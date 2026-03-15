const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()  // load .env into process.env

const reportRoutes = require("./routes/reportRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// ✅ MongoDB Connection
const mongoUrl = process.env.MONGO_URL
if (!mongoUrl) {
    console.error("❌ MONGO_URL is not defined. Check your .env file and ensure dotenv is configured.")
    process.exit(1)
}

mongoose.connect(mongoUrl)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err))

// ✅ Routes
app.use("/reports", reportRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`)
})