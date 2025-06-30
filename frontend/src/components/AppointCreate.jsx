import React, { useState } from 'react'
import { createAppointmentApi, getAvailableSlotsApi } from '../services/Api'
import { useNavigate } from 'react-router-dom'

function AppointCreate() {
    const navigate = useNavigate()
    
    const [appointment, setAppointment] = useState({ name: "", phone_number: "", date: "", time_slot: null })

    const [availableSlots, setAvailableSlots] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(appointment)
        let response = await createAppointmentApi(appointment)
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            navigate('/appointment-list')
        }
        else {
            console.log("Failed++++++++++++++")
        }
    }

    async function handleDateChange(event) {
        event.preventDefault()
        let selectedDate = event.target.value
        let response = await getAvailableSlotsApi(selectedDate)
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            setAvailableSlots(response.data)
        }
        else {
            console.log("Failed+===============")
        }
    }
    function listAppointmentClick() {
        navigate('/appointment-list')
    }
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div>
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold">
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block">
                                    My Appointments
                                </span>
                            </h1>


                            <p className="text-slate-600 mt-1">Manage and track your upcoming appointments</p>
                            <div className="mt-3 text-sm">
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
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={listAppointmentClick}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center gap-2">
                                    List Appointments
                                </span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Book Your Appointment</h1>
                        <p className="text-gray-600">Please fill in the form below to schedule your appointment.</p>
                    </div>

                    <form id="bookingForm" className="space-y-5" onSubmit={handleSubmit}>

                        <div>
                            <label for="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <input
                                value={appointment.date}
                                onChange={(e) => {
                                    setAppointment({ ...appointment, date: e.target.value });
                                    handleDateChange(e)

                                }}

                                type="date" id="appointmentDate" name="appointmentDate"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                        </div>

                        <div>
                            <label for="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                            <select
                                value={appointment.time_slot}
                                onChange={(e) => setAppointment({ ...appointment, time_slot: e.target.value })}
                                id="timeSlot" name="timeSlot"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required>
                                <option value="" disabled selected>Choose a time slot</option>
                                {availableSlots && availableSlots.map((ch) => <option value={ch.slot_id}>{ch.slot_display}</option>)}
                            </select>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label for="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    value={appointment.name}
                                    onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
                                    type="text" id="fullName" name="fullName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required />
                            </div>

                            <div>
                                <label for="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    value={appointment.phone_number}
                                    onChange={(e) => setAppointment({ ...appointment, phone_number: e.target.value })}
                                    type="tel" id="phone" name="phone"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required />
                            </div>
                        </div>



                        <div>
                            <button type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-green px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white">
                                Book Appointment
                            </button>

                        </div>
                    </form>

                    <div id="confirmationMessage" className="hidden mt-6 p-4 bg-green-100 text-green-700 rounded-md">
                        <p className="font-medium">Your appointment has been scheduled!</p>
                        <p className="text-sm mt-1">We've sent a confirmation to your email.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AppointCreate