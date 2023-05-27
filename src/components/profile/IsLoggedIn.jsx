import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * checks if a user is logged in by retrieving values form local storage.
 */
export default function IsLoggedIn() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("auth"));
    if (items) {
      setItems(items);
    }
  }, []);

  function removeItem() {
    localStorage.removeItem("auth");
    navigate("/");
    navigate(0);
  }
  if (items.name) {
    return (
      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
        <Dropdown.Item data-cy="signOut" onClick={removeItem}>
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    );
  } else if (!items.name) {
    return (
      <Dropdown.Menu variant="dark">
        <Dropdown.Item data-cy="registerBn" className="registerBn" href="/Register">
          Register
        </Dropdown.Item>
        <Dropdown.Item data-cy="signInBn" className="signInBn" href="/Sign-in">
          Sign in
        </Dropdown.Item>
      </Dropdown.Menu>
    );
  }
}
