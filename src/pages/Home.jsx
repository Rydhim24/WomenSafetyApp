import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-10">Home</h1>

            <button
                onClick={() => navigate("/sos")}
                className="bg-red-600 text-white text-3xl px-16 py-16 rounded-full shadow-lg hover:bg-red-700"
            >
                SOS
            </button>

            <button
                onClick={() => navigate("/contacts")}
                className="bg-white border px-10 py-3 rounded-lg shadow-sm"
            >
                Manage Trusted Contacts
            </button>
        </div>
    )
}

export default Home