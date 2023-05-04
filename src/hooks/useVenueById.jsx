import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import VenueById from "../components/venues/VenueById";
import { venuesURL } from "../utilities/constants";

export default function UseVenuesById() {
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const {id} = useParams();
  const API_URL = `${venuesURL}/${id}?_owner=true`

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

  console.log(venue)

  function Venue(){
    return VenueById(venue)
  }

  return (
    <>
      {loading ? (
        <div>loading.-..</div>
      ) : venue ? (
        <>
          <Venue />
          
        </>
      ) : (
        setError(error)
      )}
    </>
  );
}