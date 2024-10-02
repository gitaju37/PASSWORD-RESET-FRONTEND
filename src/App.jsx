import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import ForgetPassword from "./Components/ForgetPassword"
import Home from "./Components/Home"
import ChangePassword from "./Components/ChangePassword"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/pwreset'} element={<ForgetPassword />} />
        <Route path={'/changepassword'} element={<ChangePassword  />} />
        <Route path={'/home'} element={<Home  />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
