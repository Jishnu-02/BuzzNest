import { Box, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";

const ThingsToKnow = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        p: { xs: 3, sm: 4 },
        maxWidth: "1000px",
        mx: "auto",
        my: 6,
        boxShadow: 1,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Things to know
      </Typography>

      <Divider sx={{ my: 2, width: "40px", borderBottomWidth: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Cancellation policy
      </Typography>
      <Typography sx={{ mb: 3 }}>
        No Cancellation and Refund
      </Typography>

      <Divider sx={{ my: 2, width: "40px", borderBottomWidth: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Special Note
      </Typography>

      <List sx={{ pl: 2 }}>
        {[
          <>Please carry a <strong>valid government ID</strong> along with your digital pass for entry.</>,
          <>Event registration begins at <strong>8:00 AM</strong> on both days – early arrival is recommended.</>,
          "Business attire or formal wear is recommended.",
          <>All sessions will be conducted in <strong>English</strong>.</>,
          <>Photography and video recording inside session halls are <strong>not permitted</strong> without prior approval.</>,
          "Onsite parking is available at the venue (first-come, first-served).",
        ].map((text, i) => (
          <ListItem key={i} sx={{ py: 0.5 }}>
            <ListItemText
              primaryTypographyProps={{ fontSize: "0.95rem", color: "text.secondary" }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ThingsToKnow;
