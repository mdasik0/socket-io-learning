import PropTypes from 'prop-types';

const RegisterUser = ({ userId, setUserId, socket }) => {
  const handleRegister = () => {
    const prevUsersId = JSON.parse(localStorage.getItem("user_register"));

    if (prevUsersId) {
      const userAlreadyExists = prevUsersId.find((u) => u === userId);
      if (userAlreadyExists) {
        alert("User already exists");
      } else {
        const newUsers = [...prevUsersId, userId];
        localStorage.setItem("user_register", JSON.stringify(newUsers));
      }
    } else {
      localStorage.setItem("user_register", JSON.stringify([userId]));
    }

    if (userId.trim()) {
      socket.emit("register", userId);
      alert(`Registered with userId: ${userId}`);
    } else {
      alert("Please enter a valid userId");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

// Props validation
RegisterUser.propTypes = {
  userId: PropTypes.string.isRequired, // userId must be a string and is required
  setUserId: PropTypes.func.isRequired, // setUserId must be a function and is required
  socket: PropTypes.object.isRequired,  // socket must be an object and is required
};

export default RegisterUser;
