import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Contacts() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [contacts, setContacts] = useState([])

    // Load contacts from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("trustedContacts")
        if (saved) {
            setContacts(JSON.parse(saved))
        }
    }, [])

    const saveContacts = (updated) => {
        localStorage.setItem("trustedContacts", JSON.stringify(updated))
        setContacts(updated)
    }

    const addContact = () => {
        if (!name || !phone) return

        const newContact = { name, phone }
        const updated = [...contacts, newContact]

        saveContacts(updated)

        setName("")
        setPhone("")
    }

    const removeContact = (index) => {
        const updated = contacts.filter((_, i) => i !== index)
        saveContacts(updated)
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Trusted Contacts
                </h1>

                <input
                    type="text"
                    placeholder="Contact Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 mb-2 rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border p-2 mb-4 rounded-lg"
                />

                <button
                    onClick={addContact}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                    Add Contact
                </button>

                <div className="mt-4">
                    {contacts.length === 0 && (
                        <p className="text-gray-500 text-center">
                            No contacts added
                        </p>
                    )}

                    {contacts.map((c, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <div>
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-sm text-gray-500">{c.phone}</p>
                            </div>

                            <button
                                onClick={() => removeContact(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
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

export default Contacts
