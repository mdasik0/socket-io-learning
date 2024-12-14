// Import necessary libraries
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Messages from "./components/Messages";
import MessageSending from "./components/MessageSending";
import RegisterUser from "./components/RegisterUser";

// Connect to the backend Socket.IO server
const socket = io("http://localhost:3000");

const App = () => {
  const [userId, setUserId] = useState("");

  const [messages, setMessages] = useState([]); // Array to store received messages

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Handle recipient not found
    socket.on("user_not_found", (data) => {
      alert(`${data.recipientId} is not online: ${data.message}`);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
      socket.off("user_not_found");
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Socket.IO Chat App</h1>

      {/* User Registration */}
      <RegisterUser userId={userId} setUserId={setUserId} socket={socket} />

      {/* Message Sending */}
      <MessageSending
        userId={userId}
        socket={socket}
        setMessages={setMessages}
      />

      {/* Message Display */}
      <Messages messages={messages} />
    </div>
  );
};

export default App;

