import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const [firstnameErrText, setFirstNameErrText] = useState(""); // New state for name error text
  const [lastnameErrText, setLastNameErrText] = useState(""); // New state for surname error text

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");
    setFirstNameErrText(""); // Reset name error text
    setLastNameErrText(""); // Reset surname error text

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    const firstname = data.get("name").trim(); // Get name from form data
    const lastname = data.get("surname").trim(); // Get surname from form data

    let err = false;

    // Validation checks
    if (firstname === "") {
      err = true;
      setFirstNameErrText("Please fill this field");
    }
    if (lastname === "") {
      err = true;
      setLastNameErrText("Please fill this field");
    }
    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText("Passwords do not match");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
        firstname,
        lastname,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      // error checks
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
        }
        if (e.param === "firstname") {
          setFirstNameErrText(e.msg);
        }
        if (e.param === "lastname") {
          setLastNameErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          disabled={loading}
          error={firstnameErrText !== ""}
          helperText={firstnameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Surname"
          name="surname"
          disabled={loading}
          error={lastnameErrText !== ""}
          helperText={lastnameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Create Account
        </LoadingButton>
      </Box>
    </>
  );
};

export default Signup;
