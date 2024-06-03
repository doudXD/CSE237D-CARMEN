import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket";
//Import Custom Components
import { PromptOptions } from "../containers/PromptOptions";
import { AnimationOptions } from "../containers/AnimationOptions";
import { Button } from "../components/Button";

import History from "./History";

import "./App.css";
/**
 * Base Container of Web App
 */
const App = (props) => {
  // URLs for mock server and bot connection
  // const LOCAL_URL = "ws://127.0.0.1:800";
  // const BOT_URL = "ws://100.84.29.19:5000";

  //Get URL and token from previous page

  //Setup state of prompt and animation values
  const [promptState, setPrompt] = useState("");
  const [animationState, setAnimation] = useState("");

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  console.log("YOGIGIIIIIII", props.socketUrl);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    props.socketUrl,
    {
      heartbeat: {
        message: "PING",
        returnMessage: "PONG",
        timeout: 60000,
        interval: 10000,
      },
      reconnectAttempts: 10, // Number of reconnection attempts
      reconnectInterval: 3000, // Time to wait between reconnection attempts (in milliseconds)
    }
  );

  //Translate readyState meaning
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // UseEffect to handle incoming messages from CARMEN
  useEffect(() => {
    console.log("interruptions: " + JSON.stringify(props.interruptions));
    console.log("lastJson: " + JSON.stringify(lastJsonMessage));
    if (
      lastJsonMessage !== null &&
      Array.isArray(lastJsonMessage.current_behavior.curr_behavior_list) &&
      lastJsonMessage.current_behavior.curr_behavior_list.every(
        (item) => typeof item === "object" && item !== null
      )
    ) {
      // setMessageHistory(prev => [...prev, ...(lastJsonMessage.behavior_list)]);
      setMessageHistory(lastJsonMessage.current_behavior.curr_behavior_list);
    }
  }, [lastJsonMessage, props.interruptions]);

  // console.log("json message history: " + JSON.stringify(messageHistory));

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
            marginTop: "10%",
            padding: "0% 5%",
            gap: "15px",
          }}>
          <label
            style={{
              fontSize: "35px",
            }}>
            Under Construction: Displayed Activities
          </label>
          <div> Connection Status: {connectionStatus} </div>
          <div>
            <div
              style={{ marginTop: "20px", height: "600px", overflowY: "auto" }}>
              {messageHistory &&
                Object.entries(messageHistory).map((message, index) => {
                  // console.log("message: " + JSON.stringify(message[1]));
                  const messageValue = message[1];
                  const hasPrompt = messageValue.hasOwnProperty("Prompt");
                  const hasAnimation = messageValue.hasOwnProperty("Animation");
                  const hasFunction = messageValue.hasOwnProperty("function");
                  const isCurrBehavior =
                    lastJsonMessage.current_behavior.curr_behavior_idx == index
                      ? "currBtn"
                      : "";
                  // console.log("hasPrompt: " + hasPrompt);
                  return (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      {hasPrompt ? (
                        <Button
                          key="Prompt"
                          name={`Prompt: ${JSON.stringify(
                            messageValue.Prompt
                          )}`}
                          className={isCurrBehavior}
                          onButtonClick={() => {}}
                        />
                      ) : hasAnimation ? (
                        <Button
                          key="Animation"
                          name={`Animation: ${JSON.stringify(
                            messageValue.Animation
                          )}`}
                          className={isCurrBehavior}
                          onButtonClick={() => {}}
                        />
                      ) : hasFunction ? (
                        <Button
                          key="function"
                          name={`Action: ${JSON.stringify(
                            messageValue.function
                          )}`}
                          className={isCurrBehavior}
                          onButtonClick={() => {}}
                        />
                      ) : (
                        Object.entries(messageValue).map(([key, value]) => (
                          <Button
                            key={key}
                            name={`${key}: ${JSON.stringify(value)}`}
                            className={isCurrBehavior}
                            onButtonClick={() => {}}
                          />
                        ))
                      )}
                    </div>
                  );
                })}
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

              const newInterruption = {
                promptState,
                animationState,
                time: new Date().toISOString(),
              };
              console.log(
                "newInterruption: " + JSON.stringify(newInterruption)
              );
              props.setInterruptions([...props.interruptions, newInterruption]);
              <History interruptions={props.interruptions} />;
              sendJsonMessage({
                type: "interrupt",
                promptState,
                animationState,
                token: props.token,
              });
              setPrompt("");
              setAnimation("");
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
