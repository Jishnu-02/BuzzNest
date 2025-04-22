import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

import SignUpUser from "./SignUp/SignUpUser";
import SignupOrganizer from "./SignUp/SignupOrganizer";
import BannerImg from "../assets/images/homebanner/evnt-1.png";

// Styled toggle button
const StyledToggleButton = styled("button")(({ selected }) => ({
  flex: 1,
  padding: "12px 20px",
  fontWeight: 600,
  fontSize: "1rem",
  color: "#fff",
  background: selected
    ? "linear-gradient(to right, #ff4081, #ff6e40)"
    : "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: selected
    ? "0 4px 20px rgba(255, 105, 135, 0.3)"
    : "0 2px 10px rgba(0,0,0,0.2)",
  backdropFilter: "blur(5px)",
  "&:hover": {
    background: "rgba(255,255,255,0.15)",
  },
}));

const SignUpBanner = () => {
  const [userType, setUserType] = useState("user");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: { xs: "80px", sm: "100px" }, // Added padding to prevent overlap with navbar
        paddingBottom: { xs: "80px", sm: "100px" }
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

      <Box
        sx={{
          position: "relative",
          width: isMobile ? "90%" : 900, // Adjust width for mobile
          backdropFilter: "blur(14px)",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.25)",
          padding: isMobile ? 2 : 4, // Adjust padding for mobile
          color: "#fff",
          zIndex: 2,
        }}
      >
        {/* Custom ToggleButtonGroup */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexDirection: "row", // Keep buttons in a row for all screen sizes
            justifyContent: "space-evenly", // Distribute buttons evenly
          }}
        >
          <StyledToggleButton
            selected={userType === "user"}
            onClick={() => setUserType("user")}
            style={{ fontSize: isMobile ? "0.875rem" : "1rem" }} // Adjust font size for mobile
          >
            User
          </StyledToggleButton>
          <StyledToggleButton
            selected={userType === "organizer"}
            onClick={() => setUserType("organizer")}
            style={{ fontSize: isMobile ? "0.875rem" : "1rem" }} // Adjust font size for mobile
          >
            Organizer
          </StyledToggleButton>
        </Box>

        {userType === "user" ? <SignUpUser /> : <SignupOrganizer />}
      </Box>
    </Box>
  );
};

export default SignUpBanner;
