import ListGroup from "./components/ListGroup";
import {Button, CarmenImg} from "./components/Button";

/**
 * Container with button and CARMEN image
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
      <Button />
      <CarmenImg />
    </div>
  );
}

export default App;