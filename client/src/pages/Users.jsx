import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Trying to fetch users");
        const response = await userApi.getAll();
        setUsers(response);
        console.log("Benutzerinformationen: ", response);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await userApi.delete(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setOpenDialog(false);
      // Here you can also show a success notification
    } catch (error) {
      console.error("Failed to delete the user:", error);
      // Here you can show an error notification
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // ... existing return JSX ...



  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Users List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstname}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="left" style={{ width: "10%" }}>
                  <IconButton
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user)}>
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this user?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={() => deleteUser(userToDelete.id)} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Users;
