import ListGroup from "./components/ListGroup";
import {ButtonContainer, CarmenImg} from "./components/Button";

/**
 * Container with buttons and CARMEN image
 */
function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Change to "row"
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <ButtonContainer />
      <CarmenImg />
    </div>
  );
}

export default App;