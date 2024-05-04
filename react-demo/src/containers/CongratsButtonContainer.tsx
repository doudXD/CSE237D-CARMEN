import { Button } from "../components/Button"; // Import the Button component
import { ReadyState } from "react-use-websocket"; // Import the ReadyState type

/**
 * FlexBox containing buttons
 * @param readyState: state of websocket connection
 * @param sendMessage: function used to send message via websocket
 */
function CongratsButtonContainer({
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
  function handleCongratsClick() {
    if (readyState === ReadyState.OPEN) {
      console.log("sending message");
      sendMessage("Congrats");
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
        marginRight: "20%",
        gap: "25px",
      }}>
      <Button name="Congratulate" onButtonClick={handleCongratsClick} />
      <label>{connectionStatus}</label>
    </div>
  );
}
export { CongratsButtonContainer }; // Export the ButtonContainer component
