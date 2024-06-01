import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import App from "./pages/App.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";
import History from "./pages/History.tsx";
import Navbar from "./components/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";

interface Interruption {
  promptState: string;
  animationState: string;
}

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [interruptions, setInterruptions] = useState<Interruption[]>([]);
  const [socketUrl, setSocketUrl] = useState("");
  const [token, setToken] = useState("");

  return (
    <React.StrictMode>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/app"
            element={
              <App
                interruptions={interruptions}
                setInterruptions={setInterruptions}
                socketUrl={socketUrl}
                token={token}
              />
            }
          />
          <Route
            path="/logout"
            element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/history"
            element={<History interruptions={interruptions} />}
          />
          <Route
            path="/"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setSocketUrl={setSocketUrl}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
