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
        <input
        type="text"
        placeholder="Enter Text Here"
        value={textValue}
        onChange={handleTextChange}
        style={{
            width: '250px', // Adjust width as needed
            height: '100px', // Adjust height as needed
            fontSize: '16px', // Adjust font size as needed
        }}
        />
        <p>You typed: {textValue}</p>
    </div>
    );
}

export default TextBox;