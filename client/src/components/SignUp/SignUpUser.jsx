import React, { useRef } from "react";
import axios from "axios";
import { Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import StyledButton from "../StyledButton";

// Styled form container
const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  width: "100%",
  maxWidth: 750,
  margin: "0 auto",
  color: "#fff",
  marginTop: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(4),
    maxWidth: "90%",
    padding: theme.spacing(3),
  },
}));

// Styled Row for two fields per line
const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

// Styled TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-input": {
    color: "#fff",
    fontSize: "1rem",
  },
  "& .MuiInputLabel-root": {
    color: "#bbb",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#999",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff6e40",
    },
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const SignUpUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      mobile: mobileRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const res = await axios.post("http://localhost:9999/api/v1/user/register", newUser);
      alert("Registration successful!");
      console.log(res.data);

      // Reset input fields after successful registration
      nameRef.current.value = "";
      emailRef.current.value = "";
      mobileRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Registration failed";
      alert(message);
    }
  };

  return (
    <FormWrapper component="form" onSubmit={handleRegister}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        textAlign="center"
        sx={{ color: "#fff", mb: 4, fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
      >
        Register as <span style={{ color: "#ff6e40" }}>User</span>
      </Typography>

      {/* Full Name field */}
      <StyledTextField
        label="Full Name"
        placeholder="Enter your full name"
        fullWidth
        margin="normal"
        inputRef={nameRef}
        required
      />

      {/* Two fields per line */}
      <Row>
        <StyledTextField
          label="Email Address"
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          inputRef={emailRef}
          required
        />
        <StyledTextField
          label="Mobile Number"
          placeholder="Enter your mobile number"
          fullWidth
          margin="normal"
          inputRef={mobileRef}
          required
        />
      </Row>

      <Row>
        <StyledTextField
          label="Password"
          placeholder="Create a password"
          type="password"
          fullWidth
          margin="normal"
          inputRef={passwordRef}
          required
        />
        <StyledTextField
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
          fullWidth
          margin="normal"
          inputRef={confirmPasswordRef}
          required
        />
      </Row>

      {/* Submit Button */}
      <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
        Register
      </StyledButton>
    </FormWrapper>
  );
};

export default SignUpUser;
