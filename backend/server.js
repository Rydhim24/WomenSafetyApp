const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let reports = []

app.get("/reports", (req, res) => {
    res.json(reports)
})

app.post("/reports", (req, res) => {
    const report = req.body
    reports.unshift(report)
    res.json({ success: true })
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`)
})