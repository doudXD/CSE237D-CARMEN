import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [urlError, setUrlError] = useState("");

  const navigate = useNavigate();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage);

      if (lastJsonMessage.status === "success") {
        props.setLoggedIn(true);
        props.setSocketUrl(url);
        props.setToken(lastJsonMessage.token);
        navigate("/app");
      } else if (lastJsonMessage.status === "error") {
        window.alert("Wrong username or password");
      }
    }
  }, [lastJsonMessage]);

  const onButtonClick = () => {
    if (username === "") {
      setNameError("Please enter a username");
    } else {
      setNameError("");
    }

    if (password === "") {
      setPasswordError("Please enter a password");
    } else {
      setPasswordError("");
    }

    if (url === "") {
      setUrlError("Please enter a URL");
    } else {
      setUrlError("");
    }

    if (username !== "" && password !== "" && url !== "") {
      console.log("sending");
      console.log(username);
      console.log(password);
      sendJsonMessage({
        type: "auth",
        username: username,
        password: password,
      });

      if (lastJsonMessage) {
        console.log("lastJsonMessage");
        console.log(lastJsonMessage);
      }
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>HELLO FROM CARMEN!</div>
        {/* <div>Connection Status: {connectionStatus}</div> */}
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={url}
          placeholder="Enter your CARMEN Robot to connect"
          onChange={(ev) => setUrl(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{urlError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Connect to CARMEN"}
        />
      </div>
    </div>
  );
};

export default Login;
