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
import { format } from "date-fns"; // Importing format from date-fns

const EventCard = ({ title, image, location, date, status }) => {
  const theme = useTheme();

  // Format the date
  const formattedDate = format(new Date(date), "MMMM dd, yyyy");

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
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
          <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.3, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", fontSize: 12 }}>
            One-day spiritual retreat to awaken your inner power
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {formattedDate} {/* Display the formatted date */}
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
