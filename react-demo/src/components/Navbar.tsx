import { Link } from "react-router-dom";
import robotImg from "../robot.png";
import "./Navbar.css";

interface NavbarProps {
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
  return (
    <nav className="Navbar">
      <h1 className="title">
        <img
          className="robotImg"
          src={robotImg}
          alt="Robot"
          style={{ width: "50px", height: "60px" }}
        />
        CARMEN-APP
      </h1>
      <div className="menu">
        {loggedIn ? (
          <>
            <Link to="/logout" className="link">
              Logout
            </Link>
            <Link to="/app" className="link">
              App
            </Link>
            <Link to="/history" className="link">
              History
            </Link>
          </>
        ) : (
          <Link to="/" className="link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
