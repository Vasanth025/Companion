import axios from "axios"
import type { RegisterState, RegisterAction } from "../utils/types"
import React from "react"
import { toast } from "react-toastify"

const Register = () => {

    const initialState: RegisterState = {
        name: "",
        email: "",
        password: "",
        loading: false,
        success: false,
        error: ""
    }

    const registerReducer = (state: RegisterState, action: RegisterAction) => {
        switch(action.type){
            case "SET_INPUT":
                return{
                    ...state,
                    [action.field]: action.value
                }
            case "LOADING":
                return{
                    ...state,
                    loading: action.value
                }
            case "REGISTER_SUCCESS":
                return{
                    ...state,
                    success: action.value
                }
            case "REGISTER_ERROR":
                return{
                    ...state,
                    error: action.value
                }

        }
    }

    const [state, dispatch] = React.useReducer(registerReducer, initialState);

    const handleRegister = async(e: React.FormEvent) =>{

        e.preventDefault();

        dispatch({type: "LOADING", value: true});

        const res = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/signup", {
            name: state.name,
            email: state.email,
            password: state.password
        });

        console.log(res.data);

        toast.success("Account created successfully!");

        dispatch({type: "LOADING", value: false});
        dispatch({type: "REGISTER_SUCCESS", value: "Account created successfully!"});

    }
    
    return (
    <div className="min-h-screen flex bg-slate-100">
        {/* Left Side */}
        <section className="w-1/2 flex items-center justify-center px-20">
            <div className="w-full max-w-md">
                <h1 className="text-5xl font-bold text-black mb-3">
                    Create Account
                </h1>

                <p className="text-gray-600 mb-12">
                    Create your account to get started.
                </p>

                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#841DED]"
                            value={state.name}
                            onChange={(e) => dispatch({ type: "SET_INPUT", field: "name", value: e.target.value })}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#841DED]"
                            value={state.email}
                            onChange={(e) => dispatch({ type: "SET_INPUT", field: "email", value: e.target.value })}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#841DED]"
                            value={state.password}
                            onChange={(e) => dispatch({ type: "SET_INPUT", field: "password", value: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#841DED] py-3 font-semibold text-white transition hover:opacity-90"
                        disabled={state.loading}
                    >
                        {state.loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <span className="text-[#841DED] cursor-pointer">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </section>

        {/* Right Side */}
        <section className="w-1/2 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-8">
                {Array.from({ length: 16 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-24 w-24 rounded-xl bg-[#841DED] animate-float"
                        style={{
                            animationDelay: `${index * 0.12}s`,
                        }}
                    />
                ))}
            </div>
        </section>
    </div>
);
}

export default Register