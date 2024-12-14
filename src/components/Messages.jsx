import PropTypes from "prop-types";

const Messages = ({ messages }) => {
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Props validation
Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      senderId: PropTypes.string.isRequired, // Each message must have a senderId (string)
      message: PropTypes.string.isRequired, // Each message must have message text (string)
    })
  ).isRequired, // `messages` is a required array
};

export default Messages;
