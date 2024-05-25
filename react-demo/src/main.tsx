import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import App from "./pages/App.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";
// import History from "./pages/History.tsx";
import Navbar from "./components/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route path="/app" element={<App />} />
          <Route
            path="/logout"
            element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
