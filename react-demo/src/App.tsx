import { ButtonContainer } from "./containers/ButtonContainer";
import { CarmenImg } from "./components/CarmenImg";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
// import TextBox from "./components/TextBox";

const LOCAL_URL = "ws://127.0.0.1:800";
const BOT_URL = "ws://192.168.1.24:8000";

/**
 * Container with buttons and CARMEN image
 */
function App() {
  const [socketUrl, setSocketUrl] = useState(LOCAL_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  //print readyState
  console.log(readyState);
  return (
    // img
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CongratsButtonContainer
        readyState={readyState}
        sendMessage={sendMessage}
      />
      <CarmenImg />
    </div>
  );
}

export default App;
