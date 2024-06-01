import "./History.css";

const History = (props) => {
  console.log("interruptions: " + JSON.stringify(props.interruptions));
  return (
    <div className="mainHistoryContainer">
      <div>Interruption History</div>
      <div className="historyContainer">
        {props.interruptions
          .slice()
          .reverse()
          .map((interruption, index) => (
            <div key={index} className="interruptionContainer">
              <div className="promptContainer">
                <h2>Prompt</h2>
                <p>{interruption.promptState}</p>
              </div>
              <div className="animationContainer">
                <h2>Animation</h2>
                <p>{interruption.animationState}</p>
              </div>
              <div className="timeContainer">
                <h2>Time</h2>
                <p>{new Date(interruption.time).toLocaleString()}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
