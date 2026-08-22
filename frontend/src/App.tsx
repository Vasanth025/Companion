import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify"
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
// import Notes from "./pages/Todos";
import Todos from "./pages/Todos";

const App = () =>{
  return(
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/notes" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App;