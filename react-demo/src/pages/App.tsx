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

  interface currInter {
      idx: any; 
      promptState: string; 
      animationState: string; 
      active: boolean; 
  }
  //Setup state of prompt and animation values
  const [promptState, setPrompt] = useState("");
  const [animationState, setAnimation] = useState("");
  const [currInterrupt, setCurrInterrupt] = useState<currInter[]>([]);
  const [idxTrack, setIdxTrack] = useState(null);

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
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
    if (lastJsonMessage !== null){
      if(lastJsonMessage.current_behavior.interruption != null){
        //TODO: increment to curr behavior with interruption
        console.log("now current behavior is an interrupt");
        let index = -1;
        for (let i = 0; i < currInterrupt.length; i++){
          if(currInterrupt[i].idx == idxTrack ){
            if (index == -1 && !(currInterrupt[i].active)){
              index = i;
            }
            else if(currInterrupt[i].active){
              index = i + 1;
              break;
            }
          }
        }
        console.log("INDEX: " + index);
        //if(index > 0){currInterrupt[index-1].active = false;}
        //currInterrupt[index].active = true;
        const updatedInterruptions = currInterrupt.map((element, ind) => {
          if(ind == index){
            return {
              "idx": element.idx,
              "promptState": element.promptState,
              "animationState": element.animationState,
              "active": true,
            }; //TODO still going dont stop
          }
          else{
            return {
              "idx": element.idx,
              "promptState": element.promptState,
              "animationState": element.animationState,
              "active": false,
            };
          }
        });

        console.log("UPDATED INT: " + updatedInterruptions[0]);
        setCurrInterrupt(updatedInterruptions);

        if (currInterrupt.length - 1 > index && currInterrupt[index+1].idx == idxTrack){
          sendJsonMessage({
            type: "interrupt",
            "prompt": currInterrupt[index+1].promptState,
            "animation": currInterrupt[index+1].animationState,
            token: props.token,
          });
        }

        // setCurrInterrupt({
        //   "idx": currInterrupt.idx,
        //   "promptState": currInterrupt.promptState,
        //   "animationState": currInterrupt.animationState,
        //   "active": true,
        // });

      }
      else if(Array.isArray(lastJsonMessage.current_behavior.curr_behavior_list) &&
      lastJsonMessage.current_behavior.curr_behavior_list.every(
        (item) => typeof item === "object" && item !== null
      )
    ) {
      // setMessageHistory(prev => [...prev, ...(lastJsonMessage.behavior_list)]);
      if(currInterrupt.length > 0 && (messageHistory != lastJsonMessage.current_behavior.curr_behavior_list || idxTrack != lastJsonMessage.current_behavior.curr_behavior_idx)){
        let updateArray = [];
        let sent = false;
        for(let i = 0; i < currInterrupt.length; i++){
          if(currInterrupt[i].idx <= 0){
            console.log("first conditional" + currInterrupt);
            //setCurrInterrupt(null);
          }
          else{
            console.log("second conditional" + currInterrupt);
            // setCurrInterrupt({
            //   "idx": ((idxTrack == lastJsonMessage.current_behavior.curr_behavior_idx) ? currInterrupt.idx - 1 : currInterrupt.idx),
            //   "promptState": currInterrupt.promptState,
            //   "animationState": currInterrupt.animationState,
            //   "active": false,
            // });
            updateArray.push({
              "idx": ((idxTrack == lastJsonMessage.current_behavior.curr_behavior_idx) ? currInterrupt[i].idx - 1 : currInterrupt[i].idx),
              "promptState": currInterrupt[i].promptState,
              "animationState": currInterrupt[i].animationState,
              "active": false,
            });
            // if(currentInterrupt.idx == lastJsonMessage.current_behavior.curr_behavior_idx){
            //   sendJsonMessage({
            //     type: "interrupt",
            //     promptState,
            //     animationState,
            //     token: props.token,
            //   });
            // }
            if(currInterrupt[i].idx == lastJsonMessage.current_behavior.curr_behavior_idx && !sent){
              sendJsonMessage({
                type: "interrupt",
                "prompt": currInterrupt[i].promptState,
                "animation": currInterrupt[i].animationState,
                token: props.token,
              });
              sent = true;
            }
            
          }
        }
        setCurrInterrupt(updateArray);
      }

      setMessageHistory(lastJsonMessage.current_behavior.curr_behavior_list);
      setIdxTrack(lastJsonMessage.current_behavior.curr_behavior_idx);
    }}
  }, [lastJsonMessage, props.interruptions]);



  var displayedActivities = (messageHistory &&
    Object.entries(messageHistory).map((message, index) => {
      // console.log("message: " + JSON.stringify(message[1]));
      const messageValue = message[1];
      const hasPrompt = messageValue.hasOwnProperty("Prompt");
      const hasAnimation = messageValue.hasOwnProperty("Animation");
      const hasFunction = messageValue.hasOwnProperty("function");
      //TODO: adjust this logic to dealing with multiple interrupts array thing✔
      const interruptActive = (element) => element.active;
      // const isCurrBehavior =
      //   (idxTrack == index && (currInterrupt == null || currInterrupt.active == false))
      //     ? "currBehavior"
      //     : "";
      const isCurrBehavior =
        (idxTrack == index && (!(currInterrupt.some(interruptActive))))
          ? "currBehavior"
          : "";
      // const isCurrInterrupt = (idxTrack == index && (currInterrupt != null && currInterrupt.active == true))
      // ? "currBehavior"
      // : "";
      // if(currInterrupt != null){
      //   console.log(`currInterrupt: ${idxTrack == index} ${currInterrupt != null} ${currInterrupt.active == true}`);
      // }
      let relevantInterrupt = [];
      for(let i = 0; i < currInterrupt.length; i++){
        if(currInterrupt[i].idx == index){
          relevantInterrupt.push(currInterrupt[i]);
        }
      }
      let interruptAddition = relevantInterrupt.map((element) => 
      <div key={"interrupt"} style={{ marginBottom: "20px" }}>
        {element.promptState!=="" ? (
            <Button
              key="Prompt"
              name={`Prompt: ${element.promptState}`}
              className={(element.active) ? "currBehavior" : ""}
              onButtonClick={() => {}}
            />
          ) : element.animationState!=="" ? (
            <Button
              key="Animation"
              name={`Animation: ${element.animationState}`}
              className={(element.active) ? "currBehavior" : ""}
              onButtonClick={() => {}}
            />
          ) :  <label>oops</label>}
      </div>);
      return (
        <div>
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
        {/* {currInterrupt && currInterrupt.idx == index ? (
          <div key={"interrupt"} style={{ marginBottom: "20px" }}>
              {currInterrupt.promptState!=="" ? (
              <Button
                key="Prompt"
                name={`Prompt: ${currInterrupt.promptState}`}
                className={isCurrInterrupt}
                onButtonClick={() => {}}
              />
            ) : currInterrupt.animationState!=="" ? (
              <Button
                key="Animation"
                name={`Animation: ${currInterrupt.animationState}`}
                className={isCurrInterrupt}
                onButtonClick={() => {}}
              />
            ) :  <label>oops</label>}
          </div>
          ): <></>} */}
          {interruptAddition}
        </div>
      );
    }))
  
  function onSendClick(){
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
    //this is only true for the first interruption if after current behavior
    //TODO still needs the logic to send this at specified location
    sendJsonMessage({
      type: "interrupt",
      promptState,
      animationState,
      token: props.token,
    });
    // setCurrInterrupt({
    //   "idx": lastJsonMessage.current_behavior.curr_behavior_idx,
    //   promptState,
    //   animationState,
    //   "active": false
    // });
    //TODO: this still won't do insert behavior
    //  currInterrupt.push({
    //   "idx": lastJsonMessage.current_behavior.curr_behavior_idx,
    //   promptState,
    //   animationState,
    //   "active": false
    //  });
    // setCurrInterrupt(currInterrupt.concat([{
    //   "idx": lastJsonMessage.current_behavior.curr_behavior_idx,
    //   promptState,
    //   animationState,
    //   "active": false,
    // }]));
    // setMessageHistory(prev => [...prev, ...(lastJsonMessage.behavior_list)]);
    setCurrInterrupt([...currInterrupt, {
      "idx": lastJsonMessage.current_behavior.curr_behavior_idx,
      promptState,
      animationState,
      "active": false,
    }]);

    //I think right here this is a delay updating in time for the console log but it does add it in
    console.log("Checking currinterruption" + currInterrupt.length);
    if(currInterrupt.length > 0){console.log("Checking currinterruption part 2" + currInterrupt[0].promptState);}


    // var element = (<div key={"interrupt"} style={{ marginBottom: "20px" }}>
    //       {promptState!=="" ? (
    //         <Button
    //           key="Prompt"
    //           name={`Prompt: ${promptState}`}
    //           className={""}
    //           onButtonClick={() => {}}
    //         />
    //       ) : animationState!=="" ? (
    //         <Button
    //           key="Animation"
    //           name={`Animation: ${animationState}`}
    //           className={""}
    //           onButtonClick={() => {}}
    //         />
    //       ) :  <label>oops</label>}
    //     </div>
    // );
    // displayedActivities.splice(lastJsonMessage.current_behavior.curr_behavior_idx+1,0,element);
    setPrompt("");
    setAnimation("");
  }

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
              {displayedActivities}
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
            onButtonClick={onSendClick}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
