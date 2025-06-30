import React, { useState } from 'react'
import { getTokenApi } from '../services/Api'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

    const [user, setUser] = useState({ username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // ...
    async function handleSubmit(event) {
    event.preventDefault();
    setError(""); // Clear any previous errors

    try {
        const response = await getTokenApi(user);

        // This part only runs if the login is successful (e.g., status 200)
        console.log("token: ", response.data);
        const authToken = "Token " + response.data.token;
        localStorage.setItem("token", authToken);
        navigate('/appointment-list');

    } catch (err) {
        // This block now catches ALL failures
        if (err.response) {
            // 👈 This checks if the server actually responded with an error
            // This is where "Invalid Credentials" and other server errors go.
            // (e.g., status codes 400, 401, 403, etc.)
            console.log("Server responded with error:", err.response.data);
            setError("Invalid username or password.");

        } else {
            // 👈 This means no response was received from the server
            // This is for network errors, DNS issues, etc.
            console.log("Network or other error:", err.message);
            setError("An unexpected error occurred. Please try again.");
        }
    }
}
    // ...
    return (
        <div className="bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-purple min-h-screen flex items-center justify-center p-4">

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                        <i className="fas fa-calendar-check text-2xl text-brand-indigo"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-white">AppointMe</h1>
                    <p className="text-blue-100 mt-2">Welcome back! Sign in to your account</p>
                </div>


                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                    <div className="bg-gradient-to-r from-brand-indigo to-brand-purple p-6 text-center">
                        <h2 className="text-2xl font-bold text-white">Sign In</h2>
                        <p className="text-blue-100 mt-1">Access your appointment dashboard</p>
                    </div>


                    <div className="p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <div>
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-3">
                                        <p>{error}</p>
                                    </div>
                                )}
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-gray-400"></i>
                                    </div>
                                    <input
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-lock text-gray-400"></i>
                                    </div>
                                    <input
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        type={showPassword ? "text" : "password"}
                                        id="loginPassword"
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>




                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-semibold py-3 px-4 rounded-lg hover:from-brand-purple hover:to-brand-indigo transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                SignIn
                            </button>




                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?
                                    <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold ml-1"> Sign Up</Link>
                                </p>
                            </div>
                            <div className="text-center mt-6 text-sm">
                                <a
                                    href="https://github.com/govindkrishna-s/AppointmentApp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.38-3.87-1.38-.52-1.3-1.28-1.64-1.28-1.64-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.04 11.04 0 015.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.18 1.82 1.18 3.08 0 4.45-2.69 5.43-5.26 5.71.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A10.5 10.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                                    </svg>
                                    <span className="text-blue-600 hover:text-blue-800 font-semibold">
                                        View Source
                                    </span>
                                </a>
                            </div>

                        </form>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default SignIn