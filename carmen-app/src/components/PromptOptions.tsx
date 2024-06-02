import { Button } from "./Button"; // Import the Button component
import { TextBox } from "./TextBox"; // Import the Textbox component
import "./PromptOptions.css"; // Import the CSS file for the PromptOptions component
/**
 * Prompt Options Container with Buttons and TextBox
 *
 * When button selected, updates prompt to be sent to selected value
 * When textbox input entered, updates prompt to be sent to entered value
 *
 * @param setPrompt: function called to update prompt value
 * @param promptState: string containing current prompt value
 */
function PromptOptions({
  setPrompt,
  promptState,
}: {
  setPrompt: (message: string) => void;
  promptState: string;
}) {
  // two buttons in top row, one custom input textbox in bottom row
  return (
    <div className="promptOptions">
      <h5
        style={{
          color: "grey",
          paddingTop: "5px",
          paddingLeft: "10px",
        }}>
        Prompt
      </h5>
      <div className="ButtonContainerRow">
        <Button
          //if button's prompt matches current prompt value, mark it as current(active?) button
          className={promptState == "Congrats" ? "currBtn" : "PromptButton"}
          name="Congrat"
          onButtonClick={() => setPrompt("Congrats")}
        />
        <Button
          className={
            promptState == "You got this!" ? "currBtn" : "PromptButton"
          }
          name="Encourage"
          onButtonClick={() => setPrompt("You got this!")}
        />
      </div>
      <div className="ButtonContainerRow">
        <TextBox setPrompt={setPrompt} promptState={promptState} />
      </div>
    </div>
  );
}

export { PromptOptions }; // Export the PromptOptions component
