import { useState, useEffect } from "react";
import axios from "axios";
import { profileURL } from "../utilities/constants";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import defaultImage from "../images/window-g12c04a259_1920.jpg";
import { Link } from "react-router-dom";
import { CALENDAR_OPTIONS } from "../utilities/misc";
import moment from "moment";
import Loader from "../components/loader/Loader";
import Error from "../components/error/Error";
import { PeopleFill } from "react-bootstrap-icons";

/**
 * Displays bookings if the user has any, and if the user is a venue manager, their created venues will also
 * be displayed.
 */
export default function UseBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    async function getBookings() {
      if (token.name) {
        const bookingsUrl = profileURL + `/${token.name}?_bookings=true&_venues=true&_owner=true`;

        try {
          setIsLoading(true);
          const response = await axios.get(bookingsUrl, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
          setBookings(response.data);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getBookings();
  }, [token.accessToken, token.name]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  let newDate = moment().format("DD-MM-YYYY");

  if (bookings.bookings) {
    return (
      <Container>
        {token.venueManager === true ? (
          <div>
            <h2 className="mt-5 fw-lighter border-bottom">Your Venues</h2>
            <h3 className="fw-normal mb-4 fs-4">{bookings.venues.length ? null : "You have 0 venues at the moment"}</h3>
            <Row md={2} xs={1} lg={3} className="g-3 ">
              {bookings.venues.map(({ id, name, created, price, media, maxGuests }) => (
                <Col className="mb-5" key={id}>
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
                        <Card.Title className="mb-4">{name}</Card.Title>
                        <div className="d-flex  align-items-center justify-content-between border-bottom">
                          <Card.Text className="mb-0">{price} kr NOK</Card.Text>
                          <Card.Text>
                            <PeopleFill /> {maxGuests}
                          </Card.Text>
                        </div>
                        <div className="d-flex  align-items-center justify-content-between mt-3">
                          <Card.Text>Created: {moment(created).format("DD/MM/YYYY")}</Card.Text>
                        </div>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-center align-items-center bg-primary">
                        <Card.Text className="productsLink" href={`/venue/${id}`}>
                          Update
                        </Card.Text>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ) : null}
        <h2 className="mt-3 fw-lighter border-bottom">Your Bookings</h2>
        <h3 className="fw-normal mb-4 fs-4">{bookings.bookings.length ? null : "You have 0 venues at the moment"}</h3>
        <Row md={2} xs={1} lg={3} className="g-3 ">
          {bookings.bookings.map(({ id, dateFrom, dateTo, venue: { id: venueId, media, name, price, maxGuests } }) => (
            <Col className="mb-5" key={id}>
              <Link className="venueLink" to={`/venue/${venueId}`}>
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
                    <Card.Title className="mb-4">{name}</Card.Title>
                    <div className="d-flex  align-items-center justify-content-between border-bottom">
                      <Card.Text className="mb-0">{price} kr NOK</Card.Text>
                      <Card.Text>
                        <PeopleFill /> {maxGuests}
                      </Card.Text>
                    </div>
                    {newDate < moment(dateTo).format("DD/MM/YYYY") ? (
                      <div className="d-flex  align-items-center justify-content-between mt-3">
                        <Card.Text className="mb-0">From: {moment(dateFrom).format("DD/MM/YYYY")}</Card.Text>
                        <Card.Text>To: {moment(dateTo).format("DD/MM/YYYY")}</Card.Text>
                      </div>
                    ) : (
                      <Card.Text className="text-danger fs-5">expired</Card.Text>
                    )}
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center align-items-center bg-primary">
                    <Card.Text className="productsLink" href={`/venue/${venueId}`}>
                      Take a look
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
}
