const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const reportRoutes = require("./routes/reportRoutes")

const app = express()

app.use(cors())
app.use(express.json())

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin@riddhimacluster.m8cyho5.mongodb.net/womenSafetyDB?appName=RiddhimaCluster")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Error:", err))

// ✅ Routes
app.use("/reports", reportRoutes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`)
})