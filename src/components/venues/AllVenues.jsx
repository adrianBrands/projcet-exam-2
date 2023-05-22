import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import defaultImage from "../../images/window-g12c04a259_1920.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PeopleFill } from "react-bootstrap-icons";

/**
 * displays the venues in cards with a width of 4 venues per line in full size screen. also comes with search 
 * functionality, filtering the venues by their venue name.
 * @param {data} venues  
 */
export default function AllVenues(venues) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => setSearch(e.target.value);

  const filter = venues.filter((venues) => venues.name.toLowerCase().includes(search.toLowerCase()));

  function DropDownSuggestions() {
    if (search === "") {
      return null;
    } else {
      return (
        <div>
          {filter.map(({ id, name }) => (
            <ul key={id} className="list-group">
              <Link className="venuesLink" to={`/venue/${id}`}>
                <Button className="rounded list-group-item list-group-item-action">{name}</Button>
              </Link>
            </ul>
          ))}
        </div>
      );
    }
  }

  return (
    <Container className="pb-5">
      <Form className="mt-3">
        <Form.Control type="search" placeholder="Search" className="me-2 searchForm" aria-label="Search" onChange={handleSubmit} value={search} />
        <DropDownSuggestions />
      </Form>
      <Row md={2} xs={1} lg={4} className="g-3 mt-1">
        {filter.map(({ id, name, media, location, maxGuests, price, owner: { avatar }, location: { city, country } }) => (
          <Col key={id}>
            <Link className="venueLink" to={`/venue/${id}`}>
              <Card className="venueCard h-100">
                <Card.Img
                  className="cardImg rounded"
                  style={{ width: "100%", height: "30vh", objectFit: "cover" }}
                  variant="top"
                  src={media[0] ? media[0] : defaultImage}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = defaultImage;
                  }}
                />
                <Card.Body>
                  <Card.Title className="mb-3 fs-5 border-bottom">{name}</Card.Title>
                  <img src={avatar} className="avatar rounded-circle" height={40} alt="" />
                  <div className="d-flex mb-2  align-items-center justify-content-between">
                    <Card.Text className="mb-0">{price} kr NOK</Card.Text>
                    <Card.Text>
                      <PeopleFill /> {maxGuests}
                    </Card.Text>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-secondary">{city}</p>
                    <p className="text-secondary">{country}</p>
                  </div>

                  {location.lat !== 0 && location.lng !== 0 ? (
                    <Card.Text>
                      <FaMapMarkedAlt style={{ fontSize: "25px" }} />
                    </Card.Text>
                  ) : null}
                </Card.Body>
                <Card.Footer className="cardFooter d-flex justify-content-center align-items-center">
                  <Card.Text className="productsLink" href={`/venue/${id}`}>
                    Reserve
                  </Card.Text>
                </Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
