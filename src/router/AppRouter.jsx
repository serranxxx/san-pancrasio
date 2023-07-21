
import { Route, Routes } from "react-router-dom"
import { HomePage } from '../layout/HomePage'
import { Login } from "../auth/Login"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/san-pancrasio/login" element={<Login />} />
      <Route path="/san-pancrasio" element={<Login />} />
      <Route path="/san-pancrasio/home" element={<HomePage />} />
    </Routes>
  )
}
