import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";


export default function IsLoggedIn(){
  const [items, setItems] = useState([]);
  //const clear = localStorage.clear();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('auth'));
    if (items) {
     setItems(items);
    }
  }, []);

   function removeItem() {
    localStorage.removeItem("auth");
  }

  if (items.name){
    return (
      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
        <Dropdown.Item onClick={removeItem}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    )
  } else {
    return (
      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="/Register">Register</Dropdown.Item>
        <Dropdown.Item href="/Sign-in">Sign in</Dropdown.Item>
      </Dropdown.Menu>
    )
  }




}


