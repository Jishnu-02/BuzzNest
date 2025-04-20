import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:9999/api/v1/events/list-events');
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
    <Container className="mt-5">
      <h2 className="text-center mb-4">All Events</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-muted">No events found.</p>
      ) : (
        <Row>
          {events.map(event => (
            <Col key={event._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={event.image?.secure_url || event.image}
                  alt={event.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    {event.description?.slice(0, 100)}...
                  </Card.Text>
                  <div className="mb-2 text-muted">
                    📍 {event.location}
                  </div>
                  <div className="text-muted">
                    📅 {event.date} ⏰ {event.time}
                  </div>
                  <Badge bg="primary" className="mt-2">
                    {event.category}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EventsList;
