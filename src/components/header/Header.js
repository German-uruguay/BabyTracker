import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const usuario = localStorage.getItem("usuario");

  return (
    <div className={styles.header}>
      <Navbar variant="dark" className={styles.navBar}>
        <div className={styles["navbar-brand-container"]}>
          <Navbar.Brand href="#">Baby tracker</Navbar.Brand>
          <span className={styles["navbar-welcome"]}>
            Bienvenido, {usuario}
          </span>
        </div>

        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
