import { ButtonContainer } from "./containers/ButtonContainer";
import { PromptOptions } from "./containers/PromptOptions";
import { BehaviorOptions } from "./containers/BehaviorOptions";
import { Button } from "./components/Button";
import { CarmenImg } from "./components/CarmenImg";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

const LOCAL_URL = "ws://127.0.0.1:800";
const BOT_URL = "ws://100.84.29.19:5000";

/**
 * Container with buttons and CARMEN image
 */
function App() {
  const [socketUrl, setSocketUrl] = useState(LOCAL_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);
  //print readyState
  // console.log(readyState);

  const [promptState, setPrompt] = useState("");
  const [animationState, setAnimation] = useState("");

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    // img
    <div>
      <header>
          <CarmenImg />
          <label>{connectionStatus}</label>
      </header>
      <div
        style={{
          display:"flex",
          flexDirection: "row"
        }}>
        <div
          style={{
            flexDirection: "column",
            width: "50%",
            marginBottom: "100px",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "2%",
            padding: "0% 5%",
            gap: "15px"
          }}>
          <label>Displayed Activities</label>
        </div>   
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginBottom: "100px",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "2%",
            padding: "0% 5%",
            gap: "15px"
          }}>
          <PromptOptions setPrompt={setPrompt} />
          <BehaviorOptions setAnimation={setAnimation} />
          <Button 
            name="Send" 
            onButtonClick={() => { 
              console.log("sending");
              console.log(promptState);
              console.log(animationState);
              sendJsonMessage({
                prompt: {promptState},
                animation: {animationState},
              });
              setPrompt("");
              setAnimation("");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
