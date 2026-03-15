import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SOS() {
    const navigate = useNavigate()

    const [location, setLocation] = useState(null)
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [alertSent, setAlertSent] = useState(false)

    const handleSOS = () => {
        setLoading(true)
        setError(null)
        setAlertSent(false)

        const savedContacts = localStorage.getItem("trustedContacts")
        const parsedContacts = savedContacts ? JSON.parse(savedContacts) : []

        if (parsedContacts.length === 0) {
            setError("No trusted contacts found. Please add contacts first.")
            setLoading(false)
            return
        }

        if (!navigator.geolocation) {
            setError("Geolocation not supported by browser")
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }

                setLocation(coords)
                setContacts(parsedContacts)
                setLoading(false)
                setAlertSent(true)

                console.log("🚨 SOS ALERT TRIGGERED")
                console.log("Location:", coords)
                console.log("Notifying contacts:", parsedContacts)
            },
            () => {
                setError("Unable to fetch location")
                setLoading(false)
            }
        )
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-red-600">
                Emergency SOS
            </h1>

            <button
                onClick={handleSOS}
                className="bg-red-600 text-white text-2xl px-10 py-4 rounded-lg hover:bg-red-700"
            >
                {loading ? "Processing Emergency..." : "Send Alert"}
            </button>

            {error && (
                <p className="mt-4 text-red-500">{error}</p>
            )}

            {alertSent && location && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-[420px]">
                    <h2 className="text-xl font-bold text-green-600 mb-2">
                        Alert Sent Successfully
                    </h2>

                    <p className="text-sm text-gray-600 mb-3">
                        Emergency details:
                    </p>

                    <p><strong>Latitude:</strong> {location.latitude}</p>
                    <p><strong>Longitude:</strong> {location.longitude}</p>

                    <p className="mt-3 font-semibold">
                        Notified Contacts:
                    </p>

                    {contacts.map((c, index) => (
                        <p key={index} className="text-sm text-gray-700">
                            • {c.name} ({c.phone})
                        </p>
                    ))}
                </div>
            )}

            <button
                onClick={() => navigate("/home")}
                className="mt-6 text-gray-500"
            >
                Back
            </button>
        </div>
    )
}

export default SOS
