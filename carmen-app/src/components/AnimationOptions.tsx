import { Button } from "./Button"; // Import the Button component


/**
 * Animation Options Container with Buttons
 * 
 * When button selected, updates animation to be sent to selected value
 * 
 * @param setAnimation: function called to update animation value
 * @param animationState: string containing current animation value
 */
function AnimationOptions ({
    setAnimation,
    animationState
  }: {
    setAnimation: (message: string) => void;
    animationState: string;
  }) {

    //three buttons in top row, three buttons in bottom row
    return(
        <div className="ButtonContainer">
            <h3>Animation</h3>
            <div className="ButtonContainerRow">
                <Button
                    //if button's animation matches current animation value, mark it as current(active?) button 
                    className={`AnimationButton ${animationState == "reset" ? 'currBtn' : ''}`}
                    name="Reset"
                    onButtonClick={() => setAnimation("reset")}
                />
                <Button
                    className={`AnimationButton ${animationState == "happy" ? 'currBtn' : ''}`}
                    name="Happy"
                    onButtonClick={() => setAnimation("happy")}
                />
                <Button
                    className={`AnimationButton ${animationState == "wait" ? 'currBtn' : ''}`}
                    name="Wait"
                    onButtonClick={() => setAnimation("wait")}
                />
            </div>
            <div className="ButtonContainerRow">
                <Button
                    className={`AnimationButton ${animationState == "nod" ? 'currBtn' : ''}`}
                    name="Nod"
                    onButtonClick={() => setAnimation("nod")}
                />
                <Button
                    className={`AnimationButton ${animationState == "proud" ? 'currBtn' : ''}`}
                    name="Proud"
                    onButtonClick={() => setAnimation("proud")}
                />
                <Button
                    className={`AnimationButton ${animationState == "sleep" ? 'currBtn' : ''}`}
                    name="Sleep"
                    onButtonClick={() => setAnimation("sleep")}
                />
            </div>
        </div>
    )
}

export { AnimationOptions }; // Export the AnimationOptions component