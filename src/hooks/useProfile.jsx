import { useState, useEffect } from "react";
import axios from "axios";
import { profileURL } from "../utilities/constants";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import defaultImage from "../images/window-g12c04a259_1920.jpg";
import { Link } from "react-router-dom";

export default function UseBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth'));
    if (token) {
     setToken(token);
    }
  }, []);
  
  useEffect(() => {
    async function getBookings(){
      if(token.name){
        const bookingsUrl = profileURL + `/${token.name}?_bookings=true`;
        
        try{
          const response = await axios.get(bookingsUrl, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            }
          });
          setBookings(response.data)
        } catch(error){
          console.log(error);
          setIsError(true);
        } finally {
          setIsLoading(false)
        }
      }
    }
    getBookings();
  }, [token.accessToken, token.name]);

  if(isLoading) {
    return <div>loading...</div>
  }
  if(isError) {
    return <div>errrrrror</div>
  }

  console.log(bookings)
   if(bookings.bookings){
    return (
      <Container>
        
      <Row md={2} xs={1} lg={3} className="g-3 ">
      {bookings.bookings.map((venue) => (
      <Col key={venue.id}>
        <Link className="venueLink" to={`/venue/${venue.id}`}>
          <Card className="venueCard h-100">
            <Card.Img className="cardImg rounded" style={{width: "100%", height: "30vh", objectFit: "cover"}} variant="top" src={venue.venue.media[0] ? venue.venue.media[0] : defaultImage} 
              onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=defaultImage;}} 
            />
            <Card.Body>
              <Card.Title className="mb-4">{venue.venue.name}</Card.Title>
              <div className="d-flex  align-items-center justify-content-between">
                <Card.Text className="mb-0">{venue.venue.price} kr NOK</Card.Text>
                <Card.Text>Guests: {venue.venue.maxGuests}</Card.Text>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button className="venuesLink" href={`/venue/${venue.id}`}>take a look</Button>
            </Card.Footer>
          </Card>
        </Link>
      </Col>
      ))}
    </Row>
  </Container>
    )
   }
}