import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
    const navigate = useNavigate()
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        const hour = new Date().getHours()
        const savedReports = localStorage.getItem("communityReports")
        const reports = savedReports ? JSON.parse(savedReports) : []

        // Late night rule (10PM – 5AM)
        if (hour >= 22 || hour <= 5) {
            setShowWarning(true)
        }

        if (reports.length >= 3) {
            setShowWarning(true)
        }

    }, [])

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            {showWarning && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-3 rounded-lg mb-6">
                    ⚠ Late hours detected. Stay alert and avoid unsafe areas.
                </div>
            )}

            <h1 className="text-3xl font-bold mb-10">Home</h1>

            <button
                onClick={() => navigate("/sos")}
                className="bg-red-600 text-white text-3xl px-16 py-10 rounded-xl shadow-lg hover:bg-red-700 mb-4"
            >
                SOS
            </button>

            <button
                onClick={() => navigate("/contacts")}
                className="bg-white border px-10 py-3 rounded-lg shadow-sm"
            >
                Manage Trusted Contacts
            </button>

            <button
                onClick={() => navigate("/community")}
                className="bg-white border px-10 py-3 rounded-lg shadow-sm mt-3"
            >
                Community Safety Reports
            </button>
        </div>
    )
}

export default Home