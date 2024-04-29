import robotIMG from "../robot.png";
import {useState} from 'react';

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
 */
export function ButtonContainer() {
  // holds state of congrats phrase cycle
  const [congratsState, setCongrats] = useState(0);

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Change to "row"
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20%",
        gap: "25px",
      }}>
      <Button name="Congratulate" onButtonClick={handleCongratsClick}/>
      <Button name="Congratulate2" onButtonClick={handleCongratsClick}/>
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
