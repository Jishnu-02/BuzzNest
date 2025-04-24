import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import EventCard from "./EventCard";
import { Row, Col } from "reactstrap";

const EventsList = ({ events }) => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Row>
          {events.map((event) => (
            <Col
              item
              xs={12}
              sm={6}
              md={4} 
              style={{ marginBottom: '25px' }}             
              key={event.id}
            >
              {/* Ensure full width inside Grid */}
              <Box sx={{ flexGrow: 1, width: "100%", display: "flex" }}>
                <EventCard
                  title={event.title}
                  image={event.image}
                  location={event.location}
                  date={event.date}
                  status={event.status}
                />
              </Box>
            </Col>
          ))}
        </Row>
      </Box>
    </Container>
  );
};

export default EventsList;
