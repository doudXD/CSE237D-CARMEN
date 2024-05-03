import React, { useState } from 'react';

function TextBox() {
  // State to hold the textbox value
    const [textValue, setTextValue] = useState('');

  // Function to handle textbox changes
    const handleTextChange = (event) => {
    setTextValue(event.target.value);
    };

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
            width: '150px', // Adjust width as needed
            height: '100px', // Adjust height as needed
            fontSize: '16px', // Adjust font size as needed
        }}
        />
        <p>You typed: {textValue}</p>
    </div>
    );
}

export default TextBox;