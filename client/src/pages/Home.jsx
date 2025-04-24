// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import HomeBannerSlider from "../components/HomeBannerSlider";
import LiveEventListSlider from "../components/LiveEventListSlider";
import EventFilterBar from "../components/EventFilterBar";
import axios from "axios";
import EventsList from "../components/events/EventsList";

const Home = () => {

    const [events, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const res = await axios.get('http://localhost:9999/api/v1/events/list-events');
            console.log('data', res.data);
            
            setEvents(res.data || []);
          } catch (err) {
            console.error('Failed to fetch events:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEvents();
      }, []);


    return (
        <>
            <Navbar />
            <HomeBannerSlider />
            <EventFilterBar />
            <EventsList events={events} />
            <LiveEventListSlider />
            <Footer />
        </>
    );
};

export default Home;
