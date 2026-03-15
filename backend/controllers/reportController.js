const Report = require("../models/Report")

// GET all reports
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ _id: -1 })
        res.json(reports)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// CREATE new report
exports.createReport = async (req, res) => {
    try {
        console.log("Incoming report:", req.body)

        const report = new Report(req.body)
        await report.save()

        console.log("Saved to MongoDB")

        res.json({ success: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}