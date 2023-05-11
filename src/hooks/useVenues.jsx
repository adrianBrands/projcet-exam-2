import { useState, useEffect } from "react";
import axios from "axios";
import { venuesURL } from "../utilities/constants";
import AllVenues from "../components/venues/AllVenues";
import Loader from "../components/loader/Loader";

export default function UseVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(venuesURL);
        setVenues(response.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenues();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <div>errrrrror</div>;
  }

  function Venues() {
    return AllVenues(venues);
  }

  console.log(venues);
  if (venues) {
    return (
      <>
        {" "}
        <Venues />{" "}
      </>
    );
  }
}
