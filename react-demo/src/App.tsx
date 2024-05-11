import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

//Import Custom Components
import { PromptOptions } from "./containers/PromptOptions";
import { AnimationOptions } from "./containers/AnimationOptions";
import { Button } from "./components/Button";
import { CarmenImg } from "./components/CarmenImg";

//URLs for mock server and bot connection
const LOCAL_URL = "ws://127.0.0.1:800";
const BOT_URL = "ws://100.84.29.19:5000";

/**
 * Base Container of Web App
 */
function App() {
  //setup websocket values
  const [socketUrl, setSocketUrl] = useState(BOT_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  //Translate readyState meaning
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //Setup state of prompt and animation values
  const [promptState, setPrompt] = useState("");
  const [animationState, setAnimation] = useState("");

  // Header containing CARMEN img and current connection status
  // Left half will display activites
  // Right half contains box with prompts, box with behaviors, and send button stacked 
  return (
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
          <label style = {{
            fontSize: "35px"
          }}>Under Construction: Displayed Activities</label>
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
          <PromptOptions setPrompt={setPrompt} promptState={promptState} />
          <AnimationOptions setAnimation={setAnimation} animationState={animationState} />
          <Button 
            className=""
            name="Send" 
            onButtonClick={() => { 
              //send JSON with prompt and animation and reset respective states
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
