// components/EventSliderCard.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const EventCard = ({ title, image, location, date, status }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Poster Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="260"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ lineHeight: 1.3, mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", fontSize: 12 }}>
            One-day spiritual retreat to awaken your inner power
          </Typography>
        </Box>
      </Box>

      {/* Footer Section */}
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            bgcolor: status === "Paid" ? "green" : "orange",
            color: "#fff",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 11,
          }}
        >
          {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
