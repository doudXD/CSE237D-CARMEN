import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const { loggedIn } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Goodbye!</div>
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log out"}
        />
      </div>
    </div>
  );
};

export default Logout;
