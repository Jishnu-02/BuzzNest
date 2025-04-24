// src/components/StyledButton.jsx
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #ff4081, #ff6e40)",
  color: "#fff",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  fontSize: "1rem",
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(3),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 105, 135, 0.4)",
    background: "linear-gradient(to right, #ff6e40, #ff4081)",
  },
}));

export default StyledButton;
