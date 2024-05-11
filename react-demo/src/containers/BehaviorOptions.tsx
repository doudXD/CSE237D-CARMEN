import { Button } from "../components/Button"; // Import the Button component



function BehaviorOptions ({
    setAnimation,
  }: {
    setAnimation: (message: string) => void;
  }) {

    return(
        <div className="ButtonContainer">
            <div className="ButtonContainerRow">
                <Button
                    name="Reset"
                    onButtonClick={() => setAnimation("Reset")}
                />
                <Button
                    name="Happy"
                    onButtonClick={() => setAnimation("Happy")}
                />
                <Button
                    name="Wait"
                    onButtonClick={() => setAnimation("Wait")}
                />
            </div>
            <div className="ButtonContainerRow">
                <Button
                    name="Nod"
                    onButtonClick={() => setAnimation("Nod")}
                />
                <Button
                    name="Proud"
                    onButtonClick={() => setAnimation("Proud")}
                />
                <Button
                    name="Sleep"
                    onButtonClick={() => setAnimation("Sleep")}
                />
            </div>
        </div>
    )
}

export { BehaviorOptions }; // Export the ButtonContainer component