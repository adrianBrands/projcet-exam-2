import { Container, Col, Row, Image, Card, Stack, Button, Carousel, CarouselItem } from "react-bootstrap";
import defaultImage from "../../images/window-g12c04a259_1920.jpg";
import { FaCar, FaDog, FaLaptopCode, FaUtensils } from "react-icons/fa";
import Calendar from "../forms/calendar";

export default function VenueById(data){
  return (
    <Container className="mt-3 mb-5">
      <Row md={1} xs={1} lg={2}>
        <Col className="lg-8">
          <h1 className="fw-lighter">{data.name}</h1>
          <Carousel>
            {data.media.map((url) => {
              return(
                <Carousel.Item>
                  <img  className="rounded"  src={url} alt=""/>
                </Carousel.Item>
              )
            })}
          </Carousel> 
          <div className="d-flex justify-content-between fs-5">
            {data.meta.parking ? <p><FaCar/> parking</p> : <p className="text-decoration-line-through"><FaCar/> parking</p>}
            {data.meta.pets ? <p><FaDog/> pets</p> : <p className="text-decoration-line-through"><FaDog/> pets</p>}
            {data.meta.wifi ? <p><FaLaptopCode/> wifi</p> : <p className="text-decoration-line-through"><FaLaptopCode/> wifi</p>}
            {data.meta.parking ? <p><FaUtensils/> breakfast</p> : <p className="text-decoration-line-through"><FaUtensils/> breakfast</p>}
          </div>
          {/*<Image className="shadow" src={null} alt="Description" width="100%" height="auto" rounded 
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=defaultImage;}}
            />*/}
        </Col>
        <Col className="lg-3 mt-5">
          <div>
            <h2 className="border-bottom">Description:</h2>
            <p className="fw-bold mt-3">{data.description}</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur ipsa, delectus corporis quas nihil esse consectetur reiciendis
               architecto magnam eius error facere voluptatum doloremque ad minima repellendus ipsam, suscipit non?</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ad consequuntur magni quis, illo sunt quod est aperiam unde eveniet
               consequatur ex. Iusto sint totam accusamus harum, similique esse eum!</p>
          </div>
          <Card>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div><Card.Text>{data.price === data.discountedPrice ? `${data.price},-` : null}</Card.Text></div>
                <div className="text-decoration-line-through text-muted">{data.price !== data.discountedPrice ? `${data.price},-` : null}</div>
                <div className="text-success">{data.price !== data.discountedPrice ? data.discountedPrice : null}</div>
                <div className="ms-auto text-success">{data.price !== data.discountedPrice ? `${Math.round(((data.price - data.discountedPrice) / data.price) * 100) }% ` : null}</div>
              </Stack>
            </Card.Body>
          </Card>
          <Card  className="mt-3">
            <Card.Body  className="d-flex justify-content-between">
              <Card.Title className="fw-normal">
                {data.price} kr NOK night
              </Card.Title>
              <Card.Title className="fw-normal">{data.maxGuests} guests</Card.Title>
            </Card.Body>
          </Card>
          <Stack gap={2} className="col-md-5 mx-auto mt-3">
          <Calendar />
            <Button className="mb-5"  variant="outline-primary" size="lg">Reserve</Button>
          </Stack>
        </Col>
      </Row>
    </Container>
    
  );
}