import PropTypes from "prop-types";
import { useState } from "react";

const MessageSending = ({ userId, socket, setMessages }) => {
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (recipientId.trim() && message.trim()) {
      socket.emit("private_message", {
        senderId: userId,
        recipientId,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: "You", message },
      ]);
      setMessage("");
    } else {
      alert("Please enter a recipientId and a message");
    }
  };

  return (
    <div>
      <h2>Send Private Message</h2>
      <input
        type="text"
        placeholder="Recipient userId"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

// Props validation
MessageSending.propTypes = {
  userId: PropTypes.string.isRequired,       // Must be a string and is required
  socket: PropTypes.object.isRequired,      // Must be an object and is required
  setMessages: PropTypes.func.isRequired,   // Must be a function and is required
};

export default MessageSending;
