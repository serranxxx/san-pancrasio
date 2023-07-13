
import { Route, Routes } from "react-router-dom"
import { HomePage } from '../layout/HomePage'


export const AppRouter = () => {
  return (
    <Routes>
       <Route path="/san-pancrasio" element={ <HomePage />} />
    </Routes>
  )
}
