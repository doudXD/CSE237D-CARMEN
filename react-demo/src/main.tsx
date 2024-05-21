import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./pages/App.tsx";
import Login from "./pages/Login.tsx";
// import History from "./pages/History.tsx";
import Navbar from "./components/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
