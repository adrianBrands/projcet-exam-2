import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import defaultImage from "../../images/window-g12c04a259_1920.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function AllVenues(venues) {

  const [search, setSearch ] = useState("");

  const handleSubmit = (e) => setSearch(e.target.value);
  
  const filter = venues.filter(venues => venues.name.toLowerCase().includes(search.toLowerCase()));
  
  function DropDownSuggestions(){
    if(search === ""){
      return null
    } else {
      return (<div>{filter.map((venues) => ( 
                <ul key={venues.id} className="list-group">
                  <Link className="venuesLink" to={`/venue/${venues.id}`}>
                  <Button className="rounded list-group-item list-group-item-action">{venues.name}</Button>
                  </Link>
                </ul>
              ))}
              </div>) 
    }
  }


  return (
    
    <Container className="pb-5">
      <Form className="mt-3">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 searchForm"
          aria-label="Search"
          onChange={handleSubmit}
          value={search}
        />
         <DropDownSuggestions/>
      </Form>
      <Row md={2} xs={1} lg={4} className="g-3 mt-1">
        {filter.map((venue) => (
        <Col key={venue.id}>
          <Card className="venueCard h-100">
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