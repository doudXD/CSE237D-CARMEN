import { Button } from "../components/Button"; // Import the Button component
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

/**
 * FlexBox containing buttons
 * @param readyState: state of websocket connection
 * @param sendMessage: function used to send message via websocket
 */
function ButtonContainer({
  readyState,
  sendMessage,
}: {
  readyState: ReadyState;
  sendMessage: (message: string) => void;
}) {
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // function handleCongratsClick(readyState, sendMessage) {
  //   if (readyState === ReadyState.OPEN) {
  //     console.log("sending message");
  //     sendMessage("Congrats");
  //   } else {
  //     console.log("seems the connection isn't open yet");
  //   }
  // }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10%",
        gap: "20px",
      }}>
      <Button
        name="Congratulate"
        onButtonClick={() => handleCongratsClick(readyState, sendMessage)}
      />
      <label>{connectionStatus}</label>
    </div>
  );
}

function handleCongratsClick(readyState, sendMessage) {
  if (readyState === ReadyState.OPEN) {
    console.log("sending message");
    sendMessage({
      prompt: "Congrats",
      animation: "nod",
    });
  } else {
    console.log("seems the connection isn't open yet");
  }
}

export { ButtonContainer }; // Export the ButtonContainer component
