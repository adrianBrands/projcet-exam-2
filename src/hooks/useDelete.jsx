import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { venuesURL } from "../utilities/constants";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Error from "../components/error/Error";

/**
 * Deletes a venue
 */
export default function UseDelete() {
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState([]);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();
  const API_URL = `${venuesURL}/${id}`;

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("auth"));
    if (profile) {
      setProfile(profile);
    }
  }, []);

  const navigate = useNavigate();

  async function onSubmit() {
    if (profile.name) {
      setSubmitting(true);

      try {
        const response = await axios.delete(API_URL, {
          headers: {
            Authorization: `Bearer ${profile.accessToken}`,
          },
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setSubmitting(false);
        navigate("/profile");
      }
    }
  }

  const handleClickDelete = (event) => {
    onSubmit();
  };

  return (
    <>
    {isError ? <Error /> : null}
    <Button
      size="lg"
      variant="outline-danger"
      onClick={() => {
        handleClickDelete();
      }}>
      Delete
    </Button>
    </>
  );
}
