const mongoose = require("mongoose")

const ReportSchema = new mongoose.Schema({
    keywords: String,
    aiAnalysis: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    timestamp: String,
})

module.exports = mongoose.model("Report", ReportSchema)