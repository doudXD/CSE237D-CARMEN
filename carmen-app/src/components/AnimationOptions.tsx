import { Button } from "./Button"; // Import the Button component

/**
 * Animation Options Container with Buttons
 *
 * When button selected, updates animation to be sent to selected value
 *
 * @param setAnimation: function called to update animation value
 * @param animationState: string containing current animation value
 */
function AnimationOptions({
  setAnimation,
  animationState,
}: {
  setAnimation: (message: string) => void;
  animationState: string;
}) {
  //three buttons in top row, three buttons in bottom row
  return (
    <div className="promptOptions">
      <h2
        style={{
          color: "grey",
          paddingTop: "10px",
          paddingLeft: "40px",
        }}>
        Animation
      </h2>
      <div className="ButtonContainerRow">
        <Button
          //if button's animation matches current animation value, mark it as current(active?) button
          className={animationState == "reset" ? "currBtn" : "AnimationButton"}
          name="Reset"
          onButtonClick={() => setAnimation("reset")}
        />
        <Button
          className={animationState == "happy" ? "currBtn" : "AnimationButton"}
          name="Happy"
          onButtonClick={() => setAnimation("happy")}
        />
        <Button
          className={animationState == "wait" ? "currBtn" : "AnimationButton"}
          name="Wait"
          onButtonClick={() => setAnimation("wait")}
        />
      </div>
      <div className="ButtonContainerRow">
        <Button
          className={animationState == "nod" ? "currBtn" : "AnimationButton"}
          name="Nod"
          onButtonClick={() => setAnimation("nod")}
        />
        <Button
          className={animationState == "proud" ? "currBtn" : "AnimationButton"}
          name="Proud"
          onButtonClick={() => setAnimation("proud")}
        />
        <Button
          className={animationState == "sleep" ? "currBtn" : "AnimationButton"}
          name="Sleep"
          onButtonClick={() => setAnimation("sleep")}
        />
      </div>
    </div>
  );
}

export { AnimationOptions }; // Export the AnimationOptions component
