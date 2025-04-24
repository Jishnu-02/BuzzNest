import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import EventCard from "./events/EventCard";
import Event1 from "../assets/images/homebanner/evnt-1.png";
import Event2 from "../assets/images/homebanner/event2.png";


const events = [
  {
    id: 1,
    title: "Ekam Anugraha In Coimbatore",
    image: Event1,
    location: "Coimbatore",
    date: "May 25, 2025",
    status: "Paid",
  },
  {
    id: 2,
    title: "Art & Culture Expo",
    image: Event2,
    location: "New Delhi",
    date: "June 5, 2025",
    status: "Free",
  },
  {
    id: 3,
    title: "Art & Culture Expo",
    image: Event2,
    location: "New Delhi",
    date: "June 5, 2025",
    status: "Free",
  },
  {
    id: 4,
    title: "Art & Culture Expo",
    image: Event2,
    location: "New Delhi",
    date: "June 5, 2025",
    status: "Free",
  },
  {
    id: 5, 
    title: "Art & Culture Expo",
    image: Event2,
    location: "New Delhi",
    date: "June 5, 2025",
    status: "Free",
  },
];

const LiveEventListSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ my: 10, px: isMobile ? 2 : 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3, textAlign: "left", color: "#222" }}
      >
        Explore Upcoming Live Events
      </Typography>
      <Swiper
        modules={[Navigation]}
        spaceBetween={isMobile ? 10 : 24}
        slidesPerView={isMobile ? 1.1 : 4}
        navigation
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard
              title={event.title}
              image={event.image}
              location={event.location}
              date={event.date}
              status={event.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LiveEventListSlider;
