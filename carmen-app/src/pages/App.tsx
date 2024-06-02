import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ReadyState } from "react-use-websocket";
//Import Custom Components
import { PromptOptions } from "../components/PromptOptions";
import { AnimationOptions } from "../components/AnimationOptions";
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

  //style of dictionary for monitoring currently displayed interruptions
  interface currInter {
    idx: any; //index of the non-interruption behavior the interruption is associated with
    promptState: string; //prompt of interruption
    animationState: string; //animation of interruption
    active: boolean; //is this interruption the current behavior?
    selected: boolean; // is this interruption the selected behavior?
  }
  //Setup state of prompt and animation values
  const [promptState, setPrompt] = useState(""); //state of prompt input field
  const [animationState, setAnimation] = useState(""); //state of animation input field
  const [currInterrupt, setCurrInterrupt] = useState<currInter[]>([]); //list of currently displayed interruptions
  const [idxTrack, setIdxTrack] = useState(null); //the index of the current behavior according to the last current behavior list json
  const [idxSelected, setIdxSelected] = useState(0); //the index of the selected behavior (or associated non-interruption behavior)

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
    console.log("lastJson: " + JSON.stringify(lastJsonMessage));
    if (lastJsonMessage !== null) {
      //case: Carmen starting executing interruption behavior
      if (lastJsonMessage.current_behavior.interruption != null) {
        console.log("now current behavior is an interrupt");
        //iterate to find index of interruption to be marked active
        let index = -1;
        for (let i = 0; i < currInterrupt.length; i++) {
          if (currInterrupt[i].idx == idxTrack) {
            //case: found first interruption associated with current non-interruption behavior
            //this will soon be the active interruption if the current active behavior is not further in this sequence of interruptions
            if (index == -1 && !currInterrupt[i].active) {
              index = i;
            }
            //case: found active interruption later in sequence of interruptions so the following sequential interruption will be the soon active one
            else if (currInterrupt[i].active) {
              index = i + 1;
              break;
            }
          }
        }
        console.log("INDEX: " + index);
        const interruptSelected = (element) => element.selected;
        //checks if the previous active behavior was selected
        let prev_sel =
          (idxSelected == idxTrack && !currInterrupt.some(interruptSelected)) ||
          (index > 0 && currInterrupt[index - 1].selected);
        //create an updated list of interruptions that adjust which interruptions are active and selected
        const updatedInterruptions = currInterrupt.map((element, ind) => {
          if (ind == index) {
            return {
              idx: element.idx,
              promptState: element.promptState,
              animationState: element.animationState,
              active: true,
              selected: prev_sel,
            };
          } else {
            return {
              idx: element.idx,
              promptState: element.promptState,
              animationState: element.animationState,
              active: false,
              selected: prev_sel ? false : element.selected,
            };
          }
        });

        console.log("UPDATED INT: " + updatedInterruptions[0]);
        setCurrInterrupt(updatedInterruptions);

        //to send the next interrupt when current behavior is also an interrupt
        if (
          currInterrupt.length > index + 1 &&
          currInterrupt[index + 1].idx == idxTrack
        ) {
          console.log("sending interrupt because prior interrupt is current");
          sendJsonMessage({
            type: "interrupt",
            promptState: currInterrupt[index + 1].promptState,
            animationState: currInterrupt[index + 1].animationState,
            token: props.token,
          });
        }
      } else if (
        Array.isArray(lastJsonMessage.current_behavior.curr_behavior_list) &&
        lastJsonMessage.current_behavior.curr_behavior_list.every(
          (item) => typeof item === "object" && item !== null
        )
      ) {
        // setMessageHistory(prev => [...prev, ...(lastJsonMessage.behavior_list)]);
        //case: Carmen started executed a non-interruption behavior
        //this means Carmen has sent an updated list of current behaviors as an indicator
        if (
          currInterrupt.length > 0 &&
          (messageHistory !=
            lastJsonMessage.current_behavior.curr_behavior_list ||
            idxTrack != lastJsonMessage.current_behavior.curr_behavior_idx)
        ) {
          let updateArray = [];
          let sent = false;
          //iterate in order to update interruption list with new idx values that correspond with new behavior list
          for (let i = 0; i < currInterrupt.length; i++) {
            //if list moved up, no more need for interruptions associated with removed non-interruption behavior
            if (
              currInterrupt[i].idx > 0 ||
              idxTrack != lastJsonMessage.current_behavior.curr_behavior_idx
            ) {
              let newIdx =
                idxTrack == lastJsonMessage.current_behavior.curr_behavior_idx
                  ? currInterrupt[i].idx - 1
                  : currInterrupt[i].idx;
              updateArray.push({
                idx: newIdx, //move the idx up if active index has not changed
                promptState: currInterrupt[i].promptState,
                animationState: currInterrupt[i].animationState,
                active: false,
                selected:
                  newIdx < lastJsonMessage.current_behavior.curr_behavior_idx
                    ? false
                    : currInterrupt[i].selected,
              });

              //if current behavior has interrupts after it, send the first interrupt
              if (
                newIdx == lastJsonMessage.current_behavior.curr_behavior_idx &&
                !sent
              ) {
                console.log(
                  "sending interrupt because prior behavior is current"
                );
                sendJsonMessage({
                  type: "interrupt",
                  promptState: currInterrupt[i].promptState,
                  animationState: currInterrupt[i].animationState,
                  token: props.token,
                });
                sent = true; //prevents sending following interrupts
              }
            }
          }
          setCurrInterrupt(updateArray);
        }

        let updatedIdxSelected = idxSelected;
        if (
          messageHistory !=
            lastJsonMessage.current_behavior.curr_behavior_list &&
          idxTrack == lastJsonMessage.current_behavior.curr_behavior_idx
        ) {
          updatedIdxSelected = idxSelected - 1;
        }

        setMessageHistory(lastJsonMessage.current_behavior.curr_behavior_list);
        setIdxTrack(lastJsonMessage.current_behavior.curr_behavior_idx);

        //move the selected index so that it cannot be before the active index
        if (
          updatedIdxSelected <
          lastJsonMessage.current_behavior.curr_behavior_idx
        ) {
          updatedIdxSelected =
            lastJsonMessage.current_behavior.curr_behavior_idx;
        }
        setIdxSelected(updatedIdxSelected);
      }
    }
  }, [lastJsonMessage]);

  /**
   * Called when a behavior visualization button is clicked
   * @param index the index of related non-interruption behavior
   * @param intIdx (optional) the index of the interruption within the sequence of interruptions
   */
  function selectBehavior(index: number, intIdx?: number) {
    //no selecting behaviors prior to current behavior
    if (idxTrack == null || index < idxTrack) {
      return;
    }
    let updatedInterruptions = [];
    const interruptActive = (element) => element.active;
    //intIdx will be undefined if button selected is not an interruption
    if (typeof intIdx !== "undefined") {
      let relativeInd = -1;
      for (let i = 0; i < currInterrupt.length; i++) {
        if (currInterrupt[i].idx == index) {
          relativeInd = i + intIdx; //new selected interruption's index within currInterruption
          //check if selection is or is after the active behavior (no selecting behaviors prior to active behavior)
          if (index == idxTrack && currInterrupt.some(interruptActive)) {
            let valid = false;
            for (let j = i; j <= relativeInd; j++) {
              if (currInterrupt[j].active) {
                valid = true;
                break;
              }
            }
            if (!valid) {
              return;
            }
          }
          break;
        }
      }
      //update the list of interruptions with which one is selected
      updatedInterruptions = currInterrupt.map((element, ind) => {
        if (ind == relativeInd) {
          return {
            idx: element.idx,
            promptState: element.promptState,
            animationState: element.animationState,
            active: element.active,
            selected: true,
          };
        } else {
          return {
            idx: element.idx,
            promptState: element.promptState,
            animationState: element.animationState,
            active: element.active,
            selected: false,
          };
        }
      });
    } else {
      //no selecting the non-interruption behavior if it has passed
      if (index == idxTrack && currInterrupt.some(interruptActive)) {
        return;
      }
      //ensures that if a non-interruption was selected that no interruptions are still selected
      updatedInterruptions = currInterrupt.map((element) => {
        return {
          idx: element.idx,
          promptState: element.promptState,
          animationState: element.animationState,
          active: element.active,
          selected: false,
        };
      });
    }
    setIdxSelected(index);
    setCurrInterrupt(updatedInterruptions);
  }

  //variable holding list of behavior visualizations
  var displayedActivities =
    messageHistory &&
    Object.entries(messageHistory).map((message, index) => {
      // console.log("message: " + JSON.stringify(message[1]));
      const messageValue = message[1];
      const hasPrompt = messageValue.hasOwnProperty("Prompt");
      const hasAnimation = messageValue.hasOwnProperty("Animation");
      const hasFunction = messageValue.hasOwnProperty("function");
      const interruptActive = (element) => element.active;
      const interruptSelected = (element) => element.selected;
      const isCurrBehavior =
        idxTrack == index && !currInterrupt.some(interruptActive)
          ? "currBehavior"
          : "";
      const isSelectedBehavior =
        idxSelected == index && !currInterrupt.some(interruptSelected)
          ? "selectedButton"
          : "";
      let relevantInterrupt = []; //list of interruptions following directly after this behavior
      for (let i = 0; i < currInterrupt.length; i++) {
        if (currInterrupt[i].idx == index) {
          relevantInterrupt.push(currInterrupt[i]);
        }
      }
      let interruptAddition = relevantInterrupt.map((element, j) => {
        let clname = "displayButton";
        //TODO: need to decide what to do with these different css indicators also need to inform the user what the css stylings mean
        //styling based off properties
        if (element.selected) {
          clname += " selectedButton";
        } //this probably has to go first?
        if (element.active) {
          clname += " currBehavior";
        }
        clname += " interrupt";
        return (
          //depending on what details the behavior includes a different piece is displayed (order of hierarchy: prompt, animation)
          <div
            key={`interrupt ${index}.${j}`}
            style={{ marginBottom: "20px", display: "flex" }}>
            <label
              style={{
                fontWeight: "bold",
                marginLeft: "50px",
              }}>
              New!
            </label>
            {element.promptState !== "" ? (
              <Button
                key="Prompt"
                name={`Prompt: "${element.promptState}"`}
                className={clname}
                onButtonClick={() => selectBehavior(index, j)}
              />
            ) : element.animationState !== "" ? (
              <Button
                key="Animation"
                name={`Animation: "${element.animationState}"`}
                className={clname}
                onButtonClick={() => selectBehavior(index, j)}
              />
            ) : (
              <label>oops</label>
            )}
          </div>
        );
      });
      return (
        //depending on what details the behavior includes a different piece is displayed (order of hierarchy: prompt, animation, function)
        <div>
          <div key={index} style={{ marginBottom: "20px" }}>
            {hasPrompt ? (
              <Button
                key="Prompt"
                name={`Prompt: ${JSON.stringify(messageValue.Prompt)}`}
                // className="displayButton"
                className={`displayButton ${isCurrBehavior}  ${isSelectedBehavior}`}
                onButtonClick={() => selectBehavior(index)}
              />
            ) : hasAnimation ? (
              <Button
                key="Animation"
                name={`Animation: ${JSON.stringify(messageValue.Animation)}`}
                className={`displayButton ${isCurrBehavior}  ${isSelectedBehavior}`}
                onButtonClick={() => selectBehavior(index)}
              />
            ) : hasFunction ? (
              <Button
                key="function"
                name={`Action: ${JSON.stringify(messageValue.function)}`}
                className={`displayButton ${isCurrBehavior}  ${isSelectedBehavior}`}
                onButtonClick={() => selectBehavior(index)}
              />
            ) : (
              Object.entries(messageValue).map(([key, value]) => (
                <Button
                  key={key}
                  name={`${key}: ${JSON.stringify(value)}`}
                  className={`${isCurrBehavior}  ${isSelectedBehavior}`}
                  onButtonClick={() => selectBehavior(index)}
                />
              ))
            )}
          </div>
          {interruptAddition}
        </div>
      );
    });

  function onSendClick() {
    //send JSON with prompt and animation and reset respective states
    if (promptState == "" && animationState == "") {
      console.log("nope. that's empty. tsk tsk");
      return;
    }
    console.log("sending");
    console.log(promptState);
    console.log(animationState);
    const newInterruption = {
      promptState,
      animationState,
      time: new Date().toISOString(),
    };
    console.log("newInterruption: " + JSON.stringify(newInterruption));
    props.setInterruptions([...props.interruptions, newInterruption]);
    <History interruptions={props.interruptions} />;
    let updatedInterruptions = [];
    //if there are other interruptions already visualized
    if (currInterrupt.length > 0) {
      let index = -1;
      const interruptSelected = (element) => element.selected;
      for (let i = 0; i <= currInterrupt.length; i++) {
        if (i == currInterrupt.length || currInterrupt[i].idx >= idxSelected) {
          index = i;
          console.log("setting index");
          //case: a non-interrupt behavior is selected so the new behavior will go right after it
          if (!currInterrupt.some(interruptSelected)) {
            console.log("opt1: " + i);
            //if the selected behavior is also the active behavior then the interrupt is sent immediately
            if (idxSelected == idxTrack) {
              sendJsonMessage({
                type: "interrupt",
                promptState,
                animationState,
                token: props.token,
              });
            }
            break;
          }
          //case: an interrupt is selected
          //iterate until the last index is the selected behavior
          else if (i > 0 && currInterrupt[i - 1].selected) {
            console.log("opt2: " + i);
            //if the selected behavior is also the active behavior then the interrupt is sent immediately
            if (currInterrupt[i - 1].active) {
              sendJsonMessage({
                type: "interrupt",
                promptState,
                animationState,
                token: props.token,
              });
            }
            break;
          }
        }
      }
      //update the displayed interruptions list
      //case: interruption goes at end
      if (index == currInterrupt.length) {
        console.log("should be at the end");
        updatedInterruptions = [
          ...currInterrupt,
          {
            idx: idxSelected,
            promptState,
            animationState,
            active: false,
            selected: false,
          },
        ];
      }
      //case: update non empty displayed interruption list (new interruption added not at the end of the list)
      else {
        for (let i = 0; i < currInterrupt.length; i++) {
          if (i == index) {
            updatedInterruptions.push({
              idx: idxSelected,
              promptState,
              animationState,
              active: false,
              selected: false,
            });
          }
          updatedInterruptions.push(currInterrupt[i]);
        }
      }
    }
    //case: no currently displayed interruptions
    else {
      //if the selected behavior is also the active behavior then the interrupt is sent immediately
      if (idxSelected == idxTrack) {
        sendJsonMessage({
          type: "interrupt",
          promptState,
          animationState,
          token: props.token,
        });
      }
      //update the displayed interruptions list
      updatedInterruptions.push({
        idx: idxSelected,
        promptState,
        animationState,
        active: false,
        selected: false,
      });
    }
    setCurrInterrupt(updatedInterruptions);

    //I think right here this is a delay updating in time for the console log but it does add it in
    console.log("Checking currinterruption" + currInterrupt.length);
    if (currInterrupt.length > 0) {
      console.log(
        "Checking currinterruption part 2" + currInterrupt[0].promptState
      );
    }

    //reset the input fields
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
            marginTop: "8%",
            padding: "0% 5%",
            gap: "15px",
          }}>
          <label
            style={{
              fontSize: "35px",
            }}></label>
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
            gap: "10px",
            minWidth: "500px"
          }}>
          <PromptOptions setPrompt={setPrompt} promptState={promptState} />
          <AnimationOptions
            setAnimation={setAnimation}
            animationState={animationState}
          />
          <Button
            className="insertButton"
            name="Insert"
            onButtonClick={onSendClick}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
