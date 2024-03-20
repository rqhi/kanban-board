import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the user's data using userId
    // This is a placeholder; you would fetch from your API
    setUserName('John Doe'); // Example user name
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would send the updated userName to your API
    navigate('/users'); // Navigate back to the users list after editing
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">User Name:</label>
      <input
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUser;
