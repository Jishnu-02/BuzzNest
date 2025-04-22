// src/components/HomeBannerSlider.jsx
import React from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { styled } from "@mui/system";
import BannerImgOne from "../assets/images/homebanner/evnt-1.png";
import BannerImgtwo from "../assets/images/homebanner/event2.png";
import StyledButton from "./StyledButton";

// Sample data
const events = [
  {
    id: 1,
    title: "Summer Beats Music Festival",
    description: "Experience the rhythm of the summer with top DJs and live performances. Don’t miss out!",
    image: BannerImgOne,
  },
  {
    id: 2,
    title: "Art & Culture Expo",
    description: "Dive into a celebration of creativity and cultural expressions from around the world.",
    image: BannerImgtwo,
  },
];

// Slide container
const SlideWrapper = styled(Box)({
  height: "100vh",
  width: "100%",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-start",
});

// Content container
const ContentBox = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(2px)",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  margin: theme.spacing(10),
  maxWidth: 600,
  color: "#fff",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  animation: "fadeInUp 1s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(4),
    padding: theme.spacing(3),
    textAlign: "center",
    maxWidth: "90%",
    alignSelf: "center",
  },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
}));

const HomeBannerSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        effect="fade"
        style={{ height: "100vh" }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <SlideWrapper sx={{ backgroundImage: `url(${event.image})` }}>
              <ContentBox>
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  fontWeight={700}
                  sx={{ textAlign: isMobile ? "center" : "left", mb: 2, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant={isMobile ? "body2" : "h6"}
                  sx={{ textAlign: isMobile ? "center" : "left", opacity: 0.85, mb: 2 }}
                >
                  {event.description}
                </Typography>
                <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                  <StyledButton variant="contained" size="large">
                    Book Now
                  </StyledButton>
                </Box>
              </ContentBox>
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeBannerSlider;
