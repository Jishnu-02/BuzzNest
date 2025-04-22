// src/pages/Home.js
import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import HomeBannerSlider from "../components/HomeBannerSlider";
import LiveEventListSlider from "../components/LiveEventListSlider";

const Home = () => {
    return (
        <>
            <Navbar />
            <HomeBannerSlider />
            <LiveEventListSlider />
            <Footer />
        </>
    );
};

export default Home;
