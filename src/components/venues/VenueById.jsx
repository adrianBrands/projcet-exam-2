import { Container, Col, Row, Image, Card, Stack, Button, Carousel, CarouselItem } from "react-bootstrap";
import defaultImage from "../../images/window-g12c04a259_1920.jpg";
import { FaCar, FaDog, FaLaptopCode, FaUtensils } from "react-icons/fa";
import Calendar from "../forms/Calendar";
import Update from "../forms/Update";
import { useState, useRef, useEffect } from "react";





export default function VenueById(data){
  const [isShown, setIsShown] = useState(false);
  const updateSection = useRef(null);
  const [items, setItems] = useState([]);

  const {id, name, meta, description, price, maxGuests, owner, media, rating, location} = data;
 
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('auth'));
    if (items) {
     setItems(items);
    }
  }, []);

  const handleClick = (event) => {
    setIsShown(current => !current);
  };

  const scrollDown = (ref) => {
    setTimeout(() => {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }, 500)
  };

  function UpdateDelete(){
    if(items.venueManager === true && owner.name === items.name){
      return (
        <div className="d-flex justify-content-evenly mb-5">
          <Button id="updateButton" onClick={() => { handleClick(); scrollDown(updateSection);}} variant="outline-warning">{isShown ? "close"  : "update"}</Button>
          <Button variant="outline-danger">Delete</Button>
        </div> )
    }
  }

  return (
    <Container key={id} className="mt-3">
      <Row md={1} xs={1} lg={2}>
        <Col className="lg-8">
          <h1 className="fw-lighter">{name}</h1>
          <Carousel key={id}>
            {data.media[0] ? media.map((url) => {
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
            {meta.parking ? <p><FaCar/> parking</p> : <p className="text-decoration-line-through"><FaCar/> parking</p>}
            {meta.pets ? <p><FaDog/> pets</p> : <p className="text-decoration-line-through"><FaDog/> pets</p>}
            {meta.wifi ? <p><FaLaptopCode/> wifi</p> : <p className="text-decoration-line-through"><FaLaptopCode/> wifi</p>}
            {meta.parking ? <p><FaUtensils/> breakfast</p> : <p className="text-decoration-line-through"><FaUtensils/> breakfast</p>}
          </div>
          
            <UpdateDelete />
          
          {/*<Image className="shadow" src={null} alt="Description" width="100%" height="auto" rounded 
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=defaultImage;}}
            />*/}
        </Col>
        <Col className="lg-3 mt-5">
          <div>
            <h2 className="border-bottom">Description:</h2>
            <p className="fw-bold mt-3">{description}</p>
          </div>
            
          <Card  className="mt-3">
            <Card.Body  className="d-flex justify-content-between">
              <Card.Title className="fw-normal">
                {data.price} kr NOK night
              </Card.Title>
              <Card.Title className="fw-normal">{maxGuests} guests</Card.Title>
            </Card.Body>
            <Card.Footer>
            <Calendar />
            </Card.Footer>
          </Card>
          <div ref={updateSection}>
            {isShown ? 
            <Update name={name} description={description} media={media} price={price} maxGuests={maxGuests}
            rating={rating} address={location.address} city={location.city} zip={location.zip} 
            country={location.country} continent={location.continent} lat={location.lat} lng={location.lng} />  
            : null}
          </div>
          
          
        </Col>
        
      </Row>
    </Container>
    
  );
}