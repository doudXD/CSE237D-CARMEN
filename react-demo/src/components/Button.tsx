/**
 * Button Component
 * @param name: Title displayed on button
 * @param onButtonClick: function called when button is clicked
 */
function Button({
  name,
  onButtonClick,
}: {
  name: string;
  onButtonClick: () => void;
}) {
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={onButtonClick}
      style={{
        fontSize: "50px",
        padding: "10px 20px",
        //marginRight: "20%", // Add some space between the button and the image
      }}>
      {name}
    </button>
  );
}

export { Button };
