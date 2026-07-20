import React from "react";
import type { LoginAction, LoginState } from "../utils/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const initialState: LoginState = {
        email: "",
        password: "",
        loading: false,
        error: "",
    };

    const loginReducer = (state: LoginState, action: LoginAction) => {
        switch (action.type) {
            case 'SET_INPUT':
                return {
                    ...state,
                    [action.field]: action.value
                };
            case 'LOADING':
                return {
                    ...state,
                    loading: action.value
                };
            case 'LOGIN_SUCCESS':
                return {
                    ...state,
                    error: action.value
                };
            case 'LOGIN_ERROR':
                return {
                    ...state,
                    error: action.value
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = React.useReducer(loginReducer, initialState);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'LOADING', value: true });

        const res = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/login", {
            email: state.email,
            password: state.password
        });

        localStorage.setItem("token", res.data.token);

        toast.success("Login Successful");

        navigate("/");
    };

    return (
        <div className="min-h-screen flex bg-slate-100">
            {/* Left Side */}
            <section className="w-1/2 flex items-center justify-center px-20">
                <div className="w-full max-w-md">
                    <h1 className="text-5xl font-bold text-black mb-3">
                        Welcome Back
                    </h1>

                    <p className="text-gray-600 mb-12">
                        Sign in to continue to your account.
                    </p>

                    <form className="space-y-6" onSubmit={handleLogin}>
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
                                onChange={(e) => {
                                    dispatch({
                                        type: "SET_INPUT",
                                        field: "email",
                                        value: e.target.value
                                    });
                                }}
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
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#841DED]"
                                onChange={(e) => {
                                    dispatch({
                                        type: "SET_INPUT",
                                        field: "password",
                                        value: e.target.value
                                    });
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#841DED] py-3 font-semibold text-white transition hover:opacity-90"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>Don't have an account? <span className="text-[#841DED] cursor-pointer" onClick={() => navigate("/register")}>Sign up</span></p>
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
};

export default Login;