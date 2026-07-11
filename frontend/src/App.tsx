import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify"

const App = () =>{
  return(
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App;