import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "login" }) => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, inputs);
            const jwt = response.data.token
            localStorage.setItem("token", "Bearer "+jwt)
            navigate("/")
        } catch (error) {
            console.log(error);

        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an Account" : "Login to Account"}
                    </div>
                    <div className="max-w-md text-base font-light text-slate-600">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="pl-2 underline" to={type === "signup" ? "/login" : "/signup"}>{type === "signup" ? "Login" : "Signup"}</Link>
                    </div>
                </div>
                <div className="mt-5">

                    {type === "signup" ? <LabelInput label="Name" placeholder="enter your name" onChange={(e) => {
                        setInputs({ ...inputs, name: e.target.value })
                    }} /> : null}
                    <LabelInput label="Email" placeholder="enter your email" onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value })
                    }} />
                    <LabelInput label="Password" placeholder="enter your password" type="password" onChange={(e) => {
                        setInputs({ ...inputs, password: e.target.value })
                    }} />
                    <button className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleSubmit}>{type === "signup" ? "Signup" : "Login"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
    return <div className="my-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-400 focus:shadow-outline" type={type || "text"} placeholder={placeholder} onChange={onChange} />
    </div>
}

