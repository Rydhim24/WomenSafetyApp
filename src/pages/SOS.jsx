import { useNavigate } from "react-router-dom"

function SOS() {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-red-600">
                Emergency SOS
            </h1>

            <p className="mb-10 text-gray-600">
                Press button to send emergency alert
            </p>

            <button className="bg-red-600 text-white text-2xl px-10 py-4 rounded-lg hover:bg-red-700">
                Send Alert
            </button>

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