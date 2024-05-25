import { useState } from "react";
// import useWebSocket from "react-use-websocket";
// import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

//Import Custom Components
import { PromptOptions } from "../containers/PromptOptions";
import { AnimationOptions } from "../containers/AnimationOptions";
import { Button } from "../components/Button";
import { useLocation } from "react-router-dom";

//URLs for mock server and bot connection
// const LOCAL_URL = "ws://127.0.0.1:800";
// const BOT_URL = "ws://100.84.29.19:5000";
interface LocationState {
  roboturl: string;
  token: string;
}
import "./App.css";
/**
 * Base Container of Web App
 */
function App() {
  //setup websocket values
  const location = useLocation();
  const { roboturl = "ws://100.84.29.19:5000", token } =
    (location.state as LocationState) || {};

  //Setup state of prompt and animation values
  const [promptState, setPrompt] = useState("");
  const [animationState, setAnimation] = useState("");

  // Header containing CARMEN img and current connection status
  // Left half will display activites
  // Right half contains box with prompts, box with behaviors, and send button stacked
  return (
    <div>
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
              // sendJsonMessage({
              //   prompt: { promptState },
              //   animation: { animationState },
              // });
              console.log(roboturl + "/interrupt");
              fetch(roboturl + "/interrupt", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  prompt: { promptState },
                  animation: { animationState },
                }),
              }).catch((error) => {
                console.error("Error:", error);
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
