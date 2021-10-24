import { useState } from "react"

export default function Settings() {
    const [name, setName] = useState("Good Day Cafe");
    return (
        <div className="space-y-4">
            <h1 className='text-3xl font-bold'>Settings</h1>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Name</h2>
                <input className="border-2 border-gray-200 p-2 w-1/3 rounded-md outline-none" value={name} onChange={(e) => {
                    setName(e.target.value);
                }}/>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Profile Picture</h2>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Banner Picture</h2>
            </div>
        </div>
    )
}