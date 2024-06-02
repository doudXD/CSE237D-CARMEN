import { useState } from "react";
import "./TextBox.css";
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
  promptState,
}: {
  setPrompt: (message: string) => void;
  promptState: string;
}) {
  // State to hold the textbox value
  const [textValue, setTextValue] = useState("");

  // Update prompt when enter pressed and clear textbox
  function handleInput(event) {
    if (event.key === "Enter") {
      if (textValue.trim() !== "") {
        setPrompt(textValue);
        setTextValue("");
      }
    }
  }

  // Function to handle textbox changes
  function handleTextChange(event) {
    setTextValue(event.target.value);
  }

  return (
    <div>
      <label
        htmlFor="textbox"
        style={{
          marginRight: "10px",
          //   fontWeight: "bold",
          fontSize: "30px",
          color: "grey",
        }}>
        Customized Prompt:
      </label>
      <input
        className="textBox"
        type="text"
        placeholder="   Type prompt here, press Enter to submit"
        value={textValue}
        onChange={handleTextChange}
        onKeyUp={handleInput}
      />
      <h4
        style={{
          marginTop: "40px",
          fontWeight: "bold",
          fontSize: "30px",
          color: "grey",
        }}>
        {" "}
        Current Prompt to Insert: {promptState}
      </h4>
    </div>
  );
}

export { TextBox };
