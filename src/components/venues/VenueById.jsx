import { Container, Col, Row, Image, Card, Stack, Button, Carousel, CarouselItem } from "react-bootstrap";
import defaultImage from "../../images/window-g12c04a259_1920.jpg";
import { FaCar, FaDog, FaLaptopCode, FaUtensils } from "react-icons/fa";
import Calendar from "../forms/Calendar";

export default function VenueById(data){
  return (
    <Container key={data.id} className="mt-3 mb-5">
      <Row md={1} xs={1} lg={2}>
        <Col className="lg-8">
          <h1 className="fw-lighter">{data.name}</h1>
          <Carousel key={data.id}>
            {data.media[0] ? data.media.map((url) => {
              return(
                <Carousel.Item key={url}>
                  <img  className="rounded" src={url} alt=""/>
                </Carousel.Item>
              )
            }) 
            : 
            <Carousel.Item key={defaultImage}>
              <img  className="rounded" src={defaultImage} alt=""/>
            </Carousel.Item> }
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
          </div>
        
          <Card  className="mt-3">
            <Card.Body  className="d-flex justify-content-between">
              <Card.Title className="fw-normal">
                {data.price} kr NOK night
              </Card.Title>
              <Card.Title className="fw-normal">{data.maxGuests} guests</Card.Title>
            </Card.Body>
            <Card.Footer>
            <Calendar />
            </Card.Footer>
          </Card>
          <Stack  className="col-md-5 mx-auto mt-3">
          
           
          </Stack>
        </Col>
        
      </Row>
    </Container>
    
  );
}