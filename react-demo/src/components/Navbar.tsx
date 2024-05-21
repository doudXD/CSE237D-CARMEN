import { Link } from "react-router-dom";
import robotImg from "../robot.png";
import "./Navbar.css";

const Navbar = () => {
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
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/app" className="link">
          App
        </Link>
        <Link to="/login" className="link">
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
