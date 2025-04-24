import {
  Box,
  Typography,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  CalendarToday,
} from "@mui/icons-material";
import StyledButton from "../StyledComponents/StyledButton";
import BannerImg from "../../assets/images/evnt-details-banner.jpg";
import ThingsToKnow from "./ThingsToKnow";
import EventInfo from "./EventInfo";

const SingleEvent = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "60vh", sm: "65vh", md: "75vh" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={BannerImg}
          alt="Holi Celebration Banner"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            width: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 10 },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" } }}
          >
            Holi Celebration 2025
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#ddd", mb: 3, maxWidth: "600px" }}
          >
            Come join us for a vibrant celebration of Holi filled with color, music,
            dance, food, and endless joy!
          </Typography>

          <Stack direction="row" spacing={4} flexWrap="wrap" alignItems="center" mb={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarToday fontSize="small" />
              <Typography>17 Mar 2025</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime fontSize="small" />
              <Typography>9:30 AM Onwards</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn fontSize="small" />
              <Typography>Kochi, Holiday Inn</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Event Details & Booking */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left About Section */}
          <Box sx={{ flex: isMdUp ? "2" : "1" }}>
            
            {/* <Stack direction="row" spacing={2} flexWrap="wrap">
              <Chip label="Festival" variant="outlined" />
              <Chip label="Holi" variant="outlined" />
              <Chip label="Color Party" variant="outlined" />
            </Stack> */}
            <EventInfo />
            <ThingsToKnow />
          </Box>

          {/* Right Booking Box */}
          <Box
            sx={{
              flex: isMdUp ? "1" : "1",
              border: "1px solid #e0e0e0",
              borderRadius: "16px",
              padding: 3,
              textAlign: "center",
              boxShadow: 2,
              height: "fit-content",
            }}
          >
            <StyledButton fullWidth sx={{ marginTop: '0px' }}>Register Now</StyledButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleEvent;
