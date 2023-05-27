import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VenueById from "../components/venues/VenueById";
import { venuesURL } from "../utilities/constants";
import Loader from "../components/loader/Loader";
import Error from "../components/error/Error";

/**
 * Sends data to the api, if success the VenueById component will be displayed. If error, an error message is displayed.
 */
export default function UseVenuesById() {
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const API_URL = `${venuesURL}/${id}?_bookings=true&_owner=true`;

  useEffect(
    function () {
      async function getVenue() {
        try {
          const response = await axios.get(API_URL);
          setVenue(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getVenue();
    },
    [API_URL]
  );
  
  function Venue() {
    return VenueById(venue);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : venue ? (
        <>
          <Venue />
        </>
      ) : (
        (setError(error), (<Error />))
      )}
    </>
  );
}
