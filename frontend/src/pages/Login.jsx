import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Women Safety App
                </h1>

                <input
                    type="text"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-6 rounded-lg"
                />

                <button
                    onClick={() => navigate("/home")}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login