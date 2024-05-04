import ListGroup from "./components/ListGroup";
import {ButtonContainer, CarmenImg} from "./components/Button";
import {useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import TextBox from "./components/TextBox";


/**
 * Container with buttons and CARMEN image
 */
function App() {

  const [socketUrl, setSocketUrl] = useState('ws://192.168.180.53:8000');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Change to "row"
        justifyContent: "center",
        alignItems: "left",
        height: "100vh",
      }}>
      <div style={{ 
        display: "flex",
        flexDirection: "row",
        marginBottom: "100px",
        justifyContent: "center",
        alignItems: "center",        
        }}>
        <ButtonContainer readyState={readyState} sendMessage={sendMessage} />
        <CarmenImg />
      </div>
      <TextBox />
    </div>
  );
}

export default App;