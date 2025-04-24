import { Box, Typography, Stack } from "@mui/material";

const EventInfo = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "16px",
        p: { xs: 3, sm: 4 },
        mt: 2,
        mb: 4,
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 1.5 }}
      >
        Event Info
      </Typography>

      <Box
        sx={{
          width: "40px",
          height: "3px",
          backgroundColor: "primary.main",
          borderRadius: "4px",
          mb: 3,
        }}
      />

      <Stack spacing={2}>
        <Typography sx={{ fontSize: "1rem", color: "text.primary", lineHeight: 1.8 }}>
          <strong>Summer Camp at Ampa Skyone – Unleash Your Child's Creativity! 🎨</strong>
        </Typography>

        <Typography sx={{ fontSize: "0.95rem", color: "text.secondary", lineHeight: 1.8 }}>
          Get ready for 10 days of non-stop creativity, fun, and hands-on learning at the most exciting Summer Camp in Chennai – happening at Ampa Skyone!
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 1.5 }}>
          <Typography component="li" sx={{ fontSize: "0.95rem", color: "text.secondary", mb: 0.5 }}>
            ✨ Certified skill-building sessions
          </Typography>
          <Typography component="li" sx={{ fontSize: "0.95rem", color: "text.secondary", mb: 0.5 }}>
            ✨ Take-home artwork & a grand finale showcase
          </Typography>
          <Typography component="li" sx={{ fontSize: "0.95rem", color: "text.secondary" }}>
            ✨ Delicious food & exclusive brand coupons
          </Typography>
        </Box>

        <Typography sx={{ fontSize: "0.95rem", color: "text.secondary", lineHeight: 1.8 }}>
          From pottery, painting, fluid art, to candle making – your child will explore it all in a vibrant, guided, and joyful space! 🖌️🕯️
        </Typography>
      </Stack>
    </Box>
  );
};

export default EventInfo;
