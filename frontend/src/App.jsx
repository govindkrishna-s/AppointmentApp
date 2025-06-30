import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import AppointCreate from './components/AppointCreate'
import AppointmentList from './components/AppointmentList'
import AppointmentEdit from './components/AppointmentEdit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup/" element={<SignUp></SignUp>}></Route>
        <Route path='' element={<SignIn></SignIn>}></Route>
        <Route path="appointment-create" element={<AppointCreate></AppointCreate>}></Route>
        <Route path='appointment-list' element={<AppointmentList></AppointmentList>}></Route>
        <Route path="appointment-edit/:id/" element={<AppointmentEdit></AppointmentEdit>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App