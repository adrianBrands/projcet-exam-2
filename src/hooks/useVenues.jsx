import { useState, useEffect } from "react";
import axios from "axios";
import { venuesURL } from "../utilities/constants";
import { Container, Card, Form, Row, Col, Link, Button } from "react-bootstrap";
import defaultImage from "../images/window-g12c04a259_1920.jpg";

export default function UseVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenues(){
      try{
        const response = await axios.get(venuesURL);
        setVenues(response.data)
      } catch(error){
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false)
      }
    }

    getVenues();
  }, []);

  if(isLoading) {
    return <div>loading...</div>
  }
  if(isError) {
    return <div>errrrrror</div>
  }

  console.log(venues)
  return (
  <Container className="mb-5">
    <Form className="" >
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 searchForm"
        aria-label="Search"
      />
    </Form>
    <Row md={2} xs={1} lg={4} className="g-4 mt-3">
      {venues.map((venue) => (
      <Col key={venue.id}>
        <Card className="venueCard h-70">
          <Card.Img className="cardImg rounded" style={{width: "100%", height: "30vh", objectFit: "cover"}} variant="top" src={venue.media[0]} 
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=defaultImage;}} 
          />
          <Card.Body>
            <Card.Title className="border-bottom mt-2">{venue.name}</Card.Title>
            <div className="d-flex  align-items-center justify-content-between">
              <Card.Text>{venue.price} kr NOK</Card.Text>
              <Card.Text>Guests: {venue.maxGuests}</Card.Text>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button className="venuesLink" href={`/venue/${venue.id}`}>Book</Button>
          </Card.Footer>
        </Card>
      </Col>
      ))}
    </Row>
  </Container>
  )
}