import robotIMG from "../robot.png";

/**
 * Button component (Congratulations)
 * When clicked, prints to console from a cycle of phrases.
 */
export function Button() {

  var i = 0;

  function handleClick() {
    switch(i){
      case(0):
        console.log('Congrats!\n;)');
        i++;
        break;
      case(1):
        console.log('That was great!\n:)');
        i++;
        break;
      case(2):
        console.log('Way to go!');
        i=0;
        break;
      default:
        console.log('Hey there! This is the default statement. Are you sure you\'re suppose to see me?');
    }
  }

  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={handleClick}
      style={{
        fontSize: "50px",
        padding: "10px 20px",
        marginRight: "20%", // Add some space between the button and the image
      }}>
      Congratulate
    </button>
  );
}

/**
 * CARMEN img
 */
export function CarmenImg() {
  return (
    <img
      src={robotIMG}
      alt="My Graphic"
      style={{ width: "20%"}}
    />
  );
}
