import React, { useEffect, useState } from 'react'
import { appointmentListApi, deleteAppointmentApi, editAppointmentApi } from '../services/Api'
import { useNavigate } from 'react-router-dom'

function AppointmentList() {

    const TIME_SLOT_CHOICES = [
        ['10:00-10:30', '10:00 AM - 10:30 AM'],
        ['10:30-11:00', '10:30 AM - 11:00 AM'],
        ['11:00-11:30', '11:00 AM - 11:30 AM'],
        ['11:30-12:00', '11:30 AM - 12:00 PM'],
        ['12:00-12:30', '12:00 PM - 12:30 PM'],
        ['12:30-13:00', '12:30 PM - 1:00 PM'],
        ['14:00-14:30', '2:00 PM - 2:30 PM'],
        ['14:30-15:00', '2:30 PM - 3:00 PM'],
        ['15:00-15:30', '3:00 PM - 3:30 PM'],
        ['15:30-16:00', '3:30 PM - 4:00 PM'],
        ['16:00-16:30', '4:00 PM - 4:30 PM'],
        ['16:30-17:00', '4:30 PM - 5:00 PM'],
    ];

    const [appointment, setAppointment] = useState(null)
    useEffect(() => { getAllAppointments() }, [])

    const navigate = useNavigate()

    function newAppointmentClick() {
        navigate('/appointment-create')
    }

    async function deleteAppointmentClick(id) {
        let response = await deleteAppointmentApi(id)
        if (response.status >= 200 && response.status < 300) {
            getAllAppointments()
        }
        else {
            alert("Something went wrong")
            getAllAppointments()
        }
    }

    function getTimeSlotLabel(value) {
        const match = TIME_SLOT_CHOICES.find(slot => slot[0] === value);
        return match ? match[1] : value; // fallback to raw value
    }


    async function getAllAppointments() {
        let response = await appointmentListApi()
        if (response.status >= 200 && response.status < 300) {
            setAppointment(response.data)
        }
        else {
            console.log("Failed================")
            console.log(response);

        }
    }
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div>
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
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
                                onClick={newAppointmentClick}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="blue" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    New Appointment
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
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">


                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">



                    <div className="space-y-4">

                        {appointment && appointment.map((a) => (
                            <div key={a.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{a.name}</h3>
                                            <p className="text-slate-600">Annual Health Checkup</p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                    {a.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    {getTimeSlotLabel(a.time_slot)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Upcoming</span>
                                        <div className="flex space-x-2">
                                            <button onClick={() => navigate(`/appointment-edit/${a.id}`)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                            </button>
                                            <button onClick={() => deleteAppointmentClick(a.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                        {appointment && appointment.length === 0 && (
                            <div className="text-center text-slate-500 mt-8">
                                No appointments found.
                            </div>
                        )}


                    </div>
                </div>


            </div>
        </div>
    )
}

export default AppointmentList