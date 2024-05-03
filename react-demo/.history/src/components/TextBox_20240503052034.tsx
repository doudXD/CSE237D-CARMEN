import { useState } from 'react';
import { ReadyState } from 'react-use-websocket';

function TextBox({  sendMessage, readyState }) {
  // State to hold the textbox value
    const [textValue, setTextValue] = useState('');

  // Function to handle textbox changes
    const handleTextChange = (event) => {
    setTextValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (readyState == ReadyState.OPEN) {
            if (textValue.trim() !== '') {
                sendMessage(textValue);
                setTextValue('');
        } else {
            console.log("WebSocket connection is not open.");
        }
    }}

    return (
    <div>
        <label 
        htmlFor="textbox" 
        style={{ 
            marginRight: '10px',
            fontWeight: "bold",
            fontSize: "18px" 
            }}>
                Enter Customized Instructions: 
        </label>
        <input
        type="text"
        placeholder="Enter Text Here"
        value={textValue}
        onChange={handleTextChange}
        style={{
            width: '300px', // Adjust width as needed
            height: '75px', // Adjust height as needed
            fontSize: '16px', // Adjust font size as needed
        }}
        />
        <p>You typed: {textValue}</p>
        <button onClick={handleSendMessage}>Send Message</button>
    </div>
    );
}

export default TextBox;