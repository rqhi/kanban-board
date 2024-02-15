import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would call your API to add the group
    try {
      // Replace this with your actual API call
      console.log('Submitting group:', groupName);
      navigate('/'); // Or wherever you want to redirect after adding
    } catch (error) {
      console.error('Failed to add group:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h6">Add New Group</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="groupName"
        label="Group Name"
        name="groupName"
        autoComplete="groupName"
        autoFocus
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Group
      </Button>
    </Box>
  );
};

export default AddGroupPage;
