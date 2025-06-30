import axios from "axios";

export async function signUpApi(data) {
    return await axios.post("http://127.0.0.1:8000/api/register/", data)
}

export async function getTokenApi(data) {
    return await axios.post("http://127.0.0.1:8000/api/token/", data)
}

export async function createAppointmentApi(data) {
    let token = localStorage.getItem("token")
    let headers = { Authorization: token }
    return await axios.post("http://127.0.0.1:8000/api/appointments/", data, { headers })
}

export async function getAvailableSlotsApi(date, appointment_id = null) {
    let url = `http://127.0.0.1:8000/api/appointments/slots/?date=${date}`
    if (appointment_id) {
        url += `&appointment_id=${appointment_id}`
    }
    return await axios.get(url)
}

export async function appointmentListApi() {
    let token = localStorage.getItem('token')
    let headers = { Authorization: token }
    return await axios.get("http://127.0.0.1:8000/api/appointments/", { headers })
}

export async function deleteAppointmentApi(id) {
    let token = localStorage.getItem('token')
    let headers = { Authorization: token }
    return await axios.delete(`http://127.0.0.1:8000/api/appointments/${id}/`, { headers })
}

export async function viewAppointmentApi(id) {
    let token = localStorage.getItem('token')
    let headers = { Authorization: token }
    return await axios.get(`http://127.0.0.1:8000/api/appointments/${id}/`, { headers })

}

export async function editAppointmentApi(id, data) {
    let token = localStorage.getItem('token')
    let headers = { Authorization: token }
    return await axios.put(`http://127.0.0.1:8000/api/appointments/${id}/`, data, { headers })

}