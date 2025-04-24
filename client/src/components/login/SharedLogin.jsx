import React, { useRef } from "react";
import axios from "axios";
import { Box, Typography, TextField, Link } from "@mui/material";
import { styled } from "@mui/system";
import StyledButton from "../StyledComponents/StyledButton";
import BannerImg from "../../assets/images/homebanner/evnt3.png";

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
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
}));

const SharedLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9999/api/v1/organizer/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      alert("Login successful!");
      console.log(response.data);
      
      localStorage.setItem("token", response.data.token);
      // navigate("/dashboard")
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Login failed";
      alert(message);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: { xs: "80px", sm: "100px" },
        paddingBottom: { xs: "80px", sm: "100px" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <FormWrapper component="form" onSubmit={handleLogin}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            textAlign="center"
            sx={{ color: "#fff", mb: 4, fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
          >
            Login
          </Typography>

          <StyledTextField
            label="Email Address"
            placeholder="Enter your email"
            margin="normal"
            inputRef={emailRef}
            required
          />
          <StyledTextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            margin="normal"
            inputRef={passwordRef}
            required
          />

          <StyledButton type="submit" fullWidth sx={{ mt: 3 }}>
            Login
          </StyledButton>

          {/* Account prompt */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              Don’t have an account?{" "}
              <Link
                href="/signup"
                underline="hover"
                sx={{ color: "#ff6e40", fontWeight: 600 }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </FormWrapper>
      </Box>
    </Box>
  );
};

export default SharedLogin;
