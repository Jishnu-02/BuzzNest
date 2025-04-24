import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { styled } from "@mui/system";

// Styled containers
const FilterWrapper = styled(Box)(({ theme }) => ({
  background: "#fff",
  color: "#000",
  padding: theme.spacing(3, 2),
  textAlign: "center",
}));

const TabButton = styled(Button)(({ selected }) => ({
  background: selected
    ? "linear-gradient(90deg, #FF7E5F 0%, #FD3A84 100%)"
    : "transparent",
  color: selected ? "#fff" : "#555",
  fontWeight: 500,
  borderRadius: 20,
  padding: "6px 16px",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  gap: 6,
  border: selected ? "none" : "1px solid transparent",
  boxShadow: selected ? "0 4px 10px rgba(0, 0, 0, 0.15)" : "none",
  transition: "all 0.3s ease",
}));

// Tabs Data
const filterTabs = [
  { label: "All", icon: <EventIcon fontSize="small" />, value: "all" },
  { label: "This Month", icon: <CalendarMonthIcon fontSize="small" />, value: "month" },
  { label: "This Week", icon: <HourglassBottomIcon fontSize="small" />, value: "week" },
  { label: "Trending", icon: <FavoriteIcon fontSize="small" />, value: "trending" },
  { label: "Online", icon: <PhoneIphoneIcon fontSize="small" />, value: "online" },
];

const EventFilterBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    eventType: "all",
    category: "",
  });

  const handleChange = (key) => (event) => {
    setFilters({ ...filters, [key]: event.target.value });
  };

  const handleClear = () => {
    setFilters({
      eventType: "all",
      category: "",
    });
  };

  return (
    <FilterWrapper>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        {/* Category Dropdown */}
        <FormControl sx={{ minWidth: 140 }} size="small">
          <InputLabel>Categories</InputLabel>
          <Select
            value={filters.category}
            label="Categories"
            onChange={handleChange("category")}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="concert">Concert</MenuItem>
            <MenuItem value="expo">Expo</MenuItem>
            <MenuItem value="meetup">Meetup</MenuItem>
          </Select>
        </FormControl>

        {/* Filter Tabs */}
        {filterTabs.map((tab) => (
          <TabButton
            key={tab.value}
            onClick={() => setFilters({ ...filters, eventType: tab.value })}
            selected={filters.eventType === tab.value}
            startIcon={tab.icon}
          >
            {tab.label}
          </TabButton>
        ))}
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={handleClear} variant="outlined" color="inherit">
          Clear
        </Button>
        <Button variant="contained" color="info">
          Search
        </Button>
      </Stack>
    </FilterWrapper>
  );
};

export default EventFilterBar;
