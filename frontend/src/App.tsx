import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify"
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import Todos from "./pages/Todos";
import Notes from "./pages/Notes";

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
            <Route path="/todos" element={<Todos />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App;