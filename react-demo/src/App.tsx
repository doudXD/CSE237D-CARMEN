import { CongratsButtonContainer } from "./containers/CongratsButtonContainer";
import { CarmenImg } from "./components/CarmenImg";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
// import TextBox from "./components/TextBox";

/**
 * Container with buttons and CARMEN image
 */
function App() {
  const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:800");
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
