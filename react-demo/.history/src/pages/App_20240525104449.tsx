import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

//Import Custom Components
import { PromptOptions } from "../containers/PromptOptions";
import { AnimationOptions } from "../containers/AnimationOptions";
import { Button } from "../components/Button";
import { CarmenImg } from "../components/CarmenImg";

//URLs for mock server and bot connection
const LOCAL_URL = "ws://127.0.0.1:800";
const BOT_URL =  "ws://100.84.26.84:5000";
                      
import "./App.css";
/**
 * Base Container of Web App
 */
function App() {
  //setup websocket values
  const [socketUrl, setSocketUrl] = useState(BOT_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

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

  // UseEffect to handle incoming messages from CARMEN
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (Array.isArray(lastJsonMessage.behavior_list) && lastJsonMessage.behavior_list.every(item => typeof item === 'object' && item !== null)) {
        setMessageHistory(prev => [...prev, ...lastJsonMessage.behavior_list]);
      }
    }
  }, [lastJsonMessage.behavior_list]);

  console.log("json message: " + JSON.stringify(messageHistory));




  // Header containing CARMEN img and current connection status
  // Left half will display activites 
  // Right half contains box with prompts, box with behaviors, and send button stacked
  return (
    <div>
      {/* <header>
        <CarmenImg />
        <label>{connectionStatus}</label>
      </header> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{
            flexDirection: "column",
            width: "50%",
            marginBottom: "100px",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "20%",
            padding: "0% 5%",
            gap: "15px",
          }}>
          <label
            style={{
              fontSize: "35px",
            }}>
            Under Construction: Displayed Activities
          </label>
          <div>
            <div style={{ marginTop: "20px", height: "400px", overflowY: "auto" }}>
              {messageHistory.length > 0 && (
                <div>
                  {Object.entries(messageHistory[messageHistory.length - 1]).map(([key, value]) => (
                    <Button
                    key={key}
                    name={`${key}: ${value}`}
                    onButtonClick={() => {
                      // Handle button click
                      console.log("Button clicked - Key:", key, "Value:", value);
                    }}
                  />
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginBottom: "100px",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "10%",
            padding: "0% 5%",
            gap: "15px",
          }}>
          <PromptOptions setPrompt={setPrompt} promptState={promptState} />
          <AnimationOptions
            setAnimation={setAnimation}
            animationState={animationState}
          />
          <Button
            className=""
            name="Send"
            onButtonClick={() => {
              //send JSON with prompt and animation and reset respective states
              console.log("sending");
              console.log(promptState);
              console.log(animationState);
              sendJsonMessage({
                prompt: { promptState },
                animation: { animationState },
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
