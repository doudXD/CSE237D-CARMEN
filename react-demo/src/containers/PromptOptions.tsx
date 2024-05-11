import { Button } from "../components/Button"; // Import the Button component
import { TextBox } from "../components/TextBox"; // Import the Textbox component
import { useState } from 'react'; // Import the useState ability


function PromptOptions ({
    setPrompt,
  }: {
    setPrompt: (message: string) => void;
  }) {

    return(
        <div className="ButtonContainer">
            <div className="ButtonContainerRow">
                <Button
                    name="Congratulate"
                    onButtonClick={() => setPrompt("Congrats")}
                />
                <Button
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

export { PromptOptions }; // Export the ButtonContainer component