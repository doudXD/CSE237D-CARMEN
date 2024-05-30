
// Import required modules
import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';
import readline from 'readline'

// Create an HTTP server and a WebSocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 800;

// Start the WebSocket server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Handle new client connections
wsServer.on("connection", function handleNewConnection(connection) {
  console.log("Received a new connection");

  // just printing to terminal any messages that it receives
  connection.on("message", (message) =>
    processReceivedMessage(message, connection),
  );
  rl.on('line', (input) => {
    console.log(`Received via terminal: ${input}`);
    const json = { "current_behavior": {
      "curr_behavior_list": [{"Prompt": "Here's how to play the color game.", "Responses": "Continue"}, {"Prompt": "I'll tell you the instructions first, and then we will go over an example to make sure you understand.", "Responses": ["Continue", "Back"], "Animation": "wait"}, {"Prompt": "I will flash a series of colors. Remember the colors, then tap the colors on the screen in the order that they appeared.", "Responses": ["Continue", "Back"], "Animation": "speaking_long"}, {"Prompt": "The colors I will show are blue", "Responses": "Continue", "Animation": "reset"}, {"function": "showColors", "arguments": [["BLUE"]]}],
      "curr_behavior_idx": 1
    }};
    //connection.send(JSON.stringify(json));
    connection.send(input);
  }); 
  
  connection.on("close", () => handleClientDisconnection());
});

// Handle incoming messages from clients
function processReceivedMessage(message, connection) {
    console.log("HELLLLLLLLLLLLOOOOOOOOOOOOOOOOOO" + message.toString());
    if (message.toString() === "PING") {
      connection.send("PONG");
      return
    }
    message = JSON.parse(message);
    if (message.type === "auth") {
      console.log("Authenticating user");
      authenticateUser(message, connection);
    } else if (message.type === "interrupt") {
      console.log("Interruption request");
    }
  }

function authenticateUser(message, connection) {
    if (message.username === "admin" && message.password === "pwd") {
        console.log("User authenticated");
        connection.send(JSON.stringify({status: "success", token: "12345"}));

    } else {
        console.log("User not authenticated");
        connection.send(JSON.stringify({status: "error" }));
    }
}
// Handle client disconnections
function handleClientDisconnection() {
  console.log(`Client disconnected`);
}