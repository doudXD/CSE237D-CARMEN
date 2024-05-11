import { Button } from "../components/Button"; // Import the Button component
import { TextBox } from "../components/TextBox"; // Import the Textbox component


/**
 * Prompt Options Container with Buttons and TextBox
 * 
 * When button selected, updates prompt to be sent to selected value
 * When textbox input entered, updates prompt to be sent to entered value
 * 
 * @param setPrompt: function called to update prompt value
 * @param promptState: string containing current prompt value
 */
function PromptOptions ({
    setPrompt,
    promptState
  }: {
    setPrompt: (message: string) => void;
    promptState: string;
  }) {

    // two buttons in top row, one custom input textbox in bottom row
    return(
        <div className="ButtonContainer">
            <h3>Prompt</h3>
            <div className="ButtonContainerRow">
                <Button
                    //if button's prompt matches current prompt value, mark it as current(active?) button 
                    className={`PromptButton ${promptState == "Congrats" ? 'currBtn' : ''}`}
                    name="Congratulate"
                    onButtonClick={() => setPrompt("Congrats")}
                />
                <Button
                    className={`PromptButton ${promptState == "You got this!" ? 'currBtn' : ''}`}
                    name="Encourage"
                    onButtonClick={() => setPrompt("You got this!")}
                />
            </div>
            <div className="ButtonContainerRow">
                <TextBox setPrompt={setPrompt}/>
            </div>
        </div>
    )
}

export { PromptOptions }; // Export the PromptOptions component