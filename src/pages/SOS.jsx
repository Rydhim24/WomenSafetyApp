import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SOS() {
    const navigate = useNavigate()

    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSOS = () => {
        setLoading(true)
        setError(null)

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
                setLoading(false)

                console.log("🚨 SOS ALERT TRIGGERED", coords)
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

            <p className="mb-6 text-gray-600">
                Click button to send emergency alert
            </p>

            <button
                onClick={handleSOS}
                className="bg-red-600 text-white text-2xl px-10 py-4 rounded-lg hover:bg-red-700"
            >
                {loading ? "Detecting Location..." : "Send Alert"}
            </button>

            {error && (
                <p className="mt-4 text-red-500">{error}</p>
            )}

            {location && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md text-center">
                    <h2 className="text-xl font-bold mb-2 text-green-600">
                        Alert Sent Successfully
                    </h2>
                    <p className="text-sm text-gray-600">
                        Your location has been captured
                    </p>

                    <p className="mt-2"><strong>Latitude:</strong> {location.latitude}</p>
                    <p><strong>Longitude:</strong> {location.longitude}</p>
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