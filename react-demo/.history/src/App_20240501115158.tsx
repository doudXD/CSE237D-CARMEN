import ListGroup from "./components/ListGroup";
import {ButtonContainer, CarmenImg} from "./components/Button";
import {useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

/**
 * Container with buttons and CARMEN image
 */
function App() {

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Change to "row"
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <ButtonContainer readyState={readyState} sendMessage={sendMessage} />
      <CarmenImg />
    </div>
  );
}

export default App;