import { Button } from "../components/Button"; // Import the Button component
import {TextBox} from "../components/TextBox"; // Import the Textbox component
import { useState } from 'react'; // Import the useState ability
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

/**
 * FlexBox containing buttons
 * @param readyState: state of websocket connection
 * @param sendMessage: function used to send message via websocket
 */
function ButtonContainer({
  readyState,
  sendMessage,
  children
// }: {
//   readyState: ReadyState;
//   sendMessage: (message: string) => void;
//   children: function;
}) {
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const [messageState, setMessage] = useState("");
  const [animationState, setAnimation] = useState("");

  function handleCongratsClick(readyState) {
    if (readyState === ReadyState.OPEN) {
      console.log("sending message");
      // sendMessage({
      //   prompt: "Congrats",
      //   animation: "nod",
      // });
      setMessage("Congrats");
      setAnimation("nod");
    } else {
      console.log("seems the connection isn't open yet");
    }
  }
  
  function handleEncourageClick(readyState) {
    if (readyState === ReadyState.OPEN) {
      console.log("sending message");
      // sendMessage({
      //   prompt: "You got this!",
      //   animation: "happy",
      // });
      setMessage("You got this!");
      setAnimation("happy");
    } else {
      console.log("seems the connection isn't open yet");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px 50px 75px 100px",
        //marginRight: "10%",
        gap: "20px",
        border: "5px outset black"
      }}>
      {children}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          //padding: "25px 50px 75px 100px",
          //marginRight: "10%",
          gap: "20px",
          //border: "5px outset black"
        }}>
        <Button
          name="Congratulate"
          onButtonClick={() => handleCongratsClick(readyState)}
        />
        <Button
          name="Encourage"
          onButtonClick={() => handleEncourageClick(readyState)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          //padding: "25px 50px 75px 100px",
          //marginRight: "10%",
          gap: "20px",
          //border: "5px outset black"
        }}>
        <TextBox 
          sendMessage={sendMessage} 
          readyState={readyState}
        />
        <label>{connectionStatus}</label>
      </div> */}
    </div>
  );
}

// function handleCongratsClick(readyState, sendMessage) {
//   if (readyState === ReadyState.OPEN) {
//     console.log("sending message");
//     // sendMessage({
//     //   prompt: "Congrats",
//     //   animation: "nod",
//     // });
//     setMessage("Congrats");
//     setBehavior("nod");
//   } else {
//     console.log("seems the connection isn't open yet");
//   }
// }

// function handleEncourageClick(readyState, sendMessage) {
//   if (readyState === ReadyState.OPEN) {
//     console.log("sending message");
//     // sendMessage({
//     //   prompt: "You got this!",
//     //   animation: "happy",
//     // });
//     setMessage("You got this!");
//     setBehavior("happy");
//   } else {
//     console.log("seems the connection isn't open yet");
//   }
// }

export { ButtonContainer }; // Export the ButtonContainer component
