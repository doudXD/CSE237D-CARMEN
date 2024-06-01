import { useState } from 'react';

/**
 * TextBox for custom Instructions
 * 
 * When input in textbox is entered, prompt value is set to value in textbox
 * 
 * @param setPrompt: function called to update prompt value
 * @param promptState: string containing current prompt value
 */
function TextBox({
    setPrompt,
    promptState
  }: {
    setPrompt: (message: string) => void;
    promptState: string;
  }) {
    
    // State to hold the textbox value
    const [textValue, setTextValue] = useState('');


    // Update prompt when enter pressed and clear textbox
    function handleInput(event){
        if (event.key === "Enter"){
            if (textValue.trim() !== '') {
                setPrompt(textValue);
                setTextValue('');
            }
        }
    };

    // Function to handle textbox changes
    function handleTextChange(event){
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
        onKeyUp={handleInput}
        style={{
            width: '300px', // Adjust width as needed
            height: '75px', // Adjust height as needed
            fontSize: '16px', // Adjust font size as needed
        }}
        />
        <p>Current Prompt: {promptState}</p>
    </div>
    );
}

export { TextBox };