import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { venuesURL } from "../utilities/constants";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function UseDelete() {
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState([]);

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
        console.log(error);
        console.log("error", error.response.data.errors[0].message);
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
    <Button
      variant="outline-danger"
      onClick={() => {
        handleClickDelete();
      }}>
      Delete
    </Button>
  );
}
