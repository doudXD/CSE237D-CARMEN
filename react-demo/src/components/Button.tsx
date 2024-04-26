import robotIMG from "../robot.png";
function Button() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Change to "row"
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <button
        type="button"
        className="btn btn-outline-primary"
        style={{
          fontSize: "50px",
          padding: "10px 20px",
          marginRight: "400px", // Add some space between the button and the image
        }}>
        Congratulate
      </button>
      <img
        src={robotIMG}
        alt="My Graphic"
        style={{ width: "400px", height: "600px" }} // Increase width and height
      />
    </div>
  );
}

export default Button;
