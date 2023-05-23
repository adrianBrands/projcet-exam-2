import { useState, useEffect } from "react";
import axios from "axios";
import { venuesURL } from "../utilities/constants";
import AllVenues from "../components/venues/AllVenues";
import Loader from "../components/loader/Loader";
import Error from "../components/error/Error";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "react-bootstrap";

/**
 * Sends data to the api, if success the AllVenues component will be displayed, and also the first
 * 50 venues is loaded to the page. If the user scrolls down the next 50 will appear and at the end of the pge
 * a scroll to top button is added. If error, an error message is displayed.
 
 */
export default function UseVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let [limit, setLimit] = useState(50);
  const [hasMore, setHasMore] = useState(true);

  const URLEndpoint = venuesURL + `?_owner=true&_bookings=true`;

  useEffect(() => {
    async function getVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(URLEndpoint);
        setVenues(response.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenues();
  }, [URLEndpoint]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <Error />;
  }

  function Venues() {
    return AllVenues(venues.slice(0, limit));
  }

  console.log(venues.slice(0, limit));

  const fetchData = () => {
    console.log("hello");
    setLimit(limit + 10);
    if (limit === 100) {
      setHasMore(false);
      console.log(false);
    }
  };

  const ScrollTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  //console.log(venues);
  if (venues) {
    return (
      <>
        <InfiniteScroll
          dataLength={venues.slice(0, limit)} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          endMessage={
            <div>
              {" "}
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>Yay! You have seen it all</p>
              </div>
              <div className="d-flex flex-column">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="mb-5"
                  onClick={() => {
                    ScrollTop();
                  }}>
                  top
                </Button>
              </div>
            </div>
          }>
          <Venues />
        </InfiniteScroll>
      </>
    );
  }
}
