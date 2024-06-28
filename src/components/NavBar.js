import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from '../styles/Navbar.module.css'
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="150" />
        </Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink 
            exact
            className={styles.NavLink } 
            activeClassName={styles.Active} 
            to="/"
            >
            <i class="bi bi-house"></i> Home
            </NavLink>
            <NavLink 
            className={styles.NavLink }
            activeClassName={styles.Active} 
            to="/signin">
                <i class="bi bi-person-check"></i> Sign in
            </NavLink>
            <NavLink 
            className={styles.NavLink }
            activeClassName={styles.Active} 
            to="/signup">
                <i class="bi bi-person-check"></i> Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;