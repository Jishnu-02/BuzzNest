// src/pages/Home.js
import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import SingleEvent from "../components/events/SingleEvent";

const EventDetails = () => {
    return (
        <>
            <Navbar />
            <SingleEvent />
            <Footer />
        </>
    );
};

export default EventDetails;
