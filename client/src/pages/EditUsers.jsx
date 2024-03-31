import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import userApi from "../api/userApi";
import LoadingButton from "@mui/lab/LoadingButton";

const EditUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userRole, setUserRole] = useState("Teammitglied");
  const [userNameErrText, setUserNameErrText] = useState("");
  const [userPasswordErrText, setUserPasswordErrText] = useState("");
  const [userFirstNameErrText, setUserFirstNameErrText] = useState("");
  const [userLastNameErrText, setUserLastNameErrText] = useState("");
  const roles = ["Administrator", "Projektmanager", "Teammitglied"];

  const { userId } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await userApi.getOne(userId);
          setUserName(user.username);
          setUserPassword(user.password);
          setUserFirstName(user.firstname);
          setUserLastName(user.lastname);
          setUserRole(user.role);
          console.log("User information:", user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
  
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error texts
    setUserNameErrText("");
    setUserPasswordErrText("");
    setUserFirstNameErrText("");
    setUserLastNameErrText("");

    // Validation logic here
    let hasError = false;
    if (userName.trim() === "") {
      setUserNameErrText("Please fill this field");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    const user = {
      username: userName,
      password: userPassword,
      firstname: userFirstName,
      lastname: userLastName,
      role: userRole
    };
    try {
      const response = await userApi.update(userId, user);
      if (response.statusText != "undefined") {
        console.log("Updated user", userName)
        navigate("/users");
      } else {
        console.error("Failed to update the user:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to update the user:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="User Name"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={userNameErrText !== ""}
          helperText={userNameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="userFirstName"
          label="User First Name"
          name="userFirstName"
          value={userFirstName}
          onChange={(e) => setUserFirstName(e.target.value)}
          error={userFirstNameErrText !== ""}
          helperText={userFirstNameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="userLastName"
          label="User Last Name"
          name="userLastName"
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
          error={userLastNameErrText !== ""}
          helperText={userLastNameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="userPassword"
          label="User Password"
          name="userPassword"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          error={userPasswordErrText !== ""}
          helperText={userPasswordErrText}
        />
         <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={userRole}
          label="Role"
          onChange={(e) => setUserRole(e.target.value)}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="primary"
          type="submit"
          loading={loading}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </>
  );
};

export default EditUser;
