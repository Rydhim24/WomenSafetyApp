import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Community() {
    const navigate = useNavigate()

    const [keywords, setKeywords] = useState("")
    const [reports, setReports] = useState([])
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem("communityReports")
        if (saved) setReports(JSON.parse(saved))

        // Auto-fetch location
        if (!navigator.geolocation) {
            setError("Geolocation not supported")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            () => setError("Location access denied")
        )
    }, [])

    const saveReports = (updated) => {
        localStorage.setItem("communityReports", JSON.stringify(updated))
        setReports(updated)
    }

    // Simple AI-style keyword analysis
    const generateAIReport = (input) => {
        const text = input.toLowerCase()

        if (text.includes("dark") || text.includes("no lights")) {
            return "Unsafe environment detected: Poor lighting conditions may increase vulnerability."
        }

        if (text.includes("isolated") || text.includes("empty")) {
            return "Caution advised: Area appears isolated with low public presence."
        }

        if (text.includes("crowd") || text.includes("harassment")) {
            return "Potential risk detected: Reports indicate discomfort or unsafe social conditions."
        }

        return "General safety concern reported by user. Further community validation recommended."
    }

    const addReport = () => {
        if (!keywords || !location) return

        const aiAnalysis = generateAIReport(keywords)

        const newReport = {
            keywords,
            aiAnalysis,
            location,
            timestamp: new Date().toLocaleString(),
        }

        const updated = [newReport, ...reports]
        saveReports(updated)

        setKeywords("")
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[500px]">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Community Safety Reports
                </h1>

                {location && (
                    <div className="text-sm text-gray-500 mb-2">
                        📍 Location detected ({location.latitude.toFixed(3)}, {location.longitude.toFixed(3)})
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Enter keywords (e.g., dark street, isolated)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full border p-2 mb-3 rounded-lg"
                />

                <button
                    onClick={addReport}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                    Submit Smart Report
                </button>

                <div className="mt-4 max-h-60 overflow-y-auto">
                    {reports.map((r, index) => (
                        <div key={index} className="border-b py-3">
                            <p className="text-sm"><strong>Keywords:</strong> {r.keywords}</p>
                            <p className="text-sm text-blue-600">
                                <strong>AI Analysis:</strong> {r.aiAnalysis}
                            </p>
                            <p className="text-xs text-gray-400">{r.timestamp}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate("/home")}
                    className="mt-4 text-gray-500 w-full"
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default Community