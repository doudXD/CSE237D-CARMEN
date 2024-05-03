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
        placeholder="Enter text here"
        value={textValue}
        onChange={handleTextChange}
        />
        <p>You typed: {textValue}</p>
    </div>
    );
}

export default TextBox;