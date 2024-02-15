import React, { useState } from 'react';
import axios from 'axios';

const CreateGroup = ({ user }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) return;
    try {
      await axios.post('/api/groups/create', { name: groupName, userId: user._id });
      // Refresh or update UI accordingly
      alert('Group created successfully!');
    } catch (error) {
      console.error('Failed to create group', error);
      alert('Failed to create group');
    }
  };

  return (
    <div>
      {user.role === 'Administrator' && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
          />
          <button type="submit">Create Group</button>
        </form>
      )}
    </div>
  );
};

export default CreateGroup;
