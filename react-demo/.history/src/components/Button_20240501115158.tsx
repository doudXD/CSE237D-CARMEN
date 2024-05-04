import robotIMG from "../robot.png";
import {useState} from 'react';
import { ReadyState } from 'react-use-websocket';

/**
 * Button Component
 * @param name: Title displayed on button
 * @param onButtonClick: function called when button is clicked 
 */
function Button({name, onButtonClick}) {

  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={onButtonClick}
      style={{
        fontSize: "50px",
        padding: "10px 20px",
        //marginRight: "20%", // Add some space between the button and the image
      }}>
      {name}
    </button>
  );
}

/**
 * FlexBox containing buttons
 * @param readyState: state of websocket connection
 * @param sendMessage: function used to send message via websocket
 */
export function ButtonContainer({readyState, sendMessage}) {
  // holds state of congrats phrase cycle
  const [congratsState, setCongrats] = useState(0);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // When button clicked, prints to console from a cycle of phrases.
  function handleCongratsClick(){
    switch(congratsState){
      case(0):
        console.log('Congrats!\n;)');
        setCongrats(1);
        break;
      case(1):
        console.log('That was great!\n:)');
        setCongrats(2);
        break;
      case(2):
        console.log('Way to go!');
        setCongrats(0);
        break;
      default:
        console.log('Hey there! This is the default statement. Are you sure you\'re suppose to see me?');
    }
  }
  function handleCongratsClickWebsocket(){
    if(readyState === ReadyState.OPEN){
      switch(congratsState){
        case(0):
          sendMessage('Congrats!\n;)');
          setCongrats(1);
          break;
        case(1):
          sendMessage('That was great!\n:)');
          setCongrats(2);
          break;
        case(2):
          sendMessage('Way to go!');
          setCongrats(0);
          break;
        default:
          sendMessage('Hey there! This is the default statement. Are you sure you\'re suppose to see me?');
      }
    }
    else{
      console.log('seems the connection isn\'t open yet');
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
      <Button name="Congratulate" onButtonClick={handleCongratsClick}/>
      <Button name="Congratulate(Websocket Edition)" onButtonClick={handleCongratsClickWebsocket}/>
      <label>{connectionStatus}</label>
    </div>

  );
}

/**
 * CARMEN img
 */
export function CarmenImg() {
  return (
    <img
      src={robotIMG}
      alt="My Graphic"
      style={{ width: "20%"}}
    />
  );
}
