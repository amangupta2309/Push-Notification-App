import React, { useState } from "react";
import "firebase/storage";
import { Navbar, Nav, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";


export default function NavigationBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Navbar style={{ backgroundColor: "#160469" }}>
        <Navbar.Brand href="#" style={{ color: "#9d96ff" }}>
          Notiify
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/" style={{ color: "#ffffff" }}>
            Home
          </Nav.Link>
          {currentUser && (
            <>
              <Nav.Link
                href={"/createnotif"}
                style={{ color: "#ffffff" }}
              >
                Create
              </Nav.Link>
              <Nav.Link
                href={"/analytics"}
                style={{ color: "#ffffff" }}
              >
                Analytics
              </Nav.Link>
            </>
          )}

        </Nav>
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Nav.Link
                href="#"
                onClick={handleLogout}
                style={{ color: "#ffffff" }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login" style={{ color: "#ffffff" }}>
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
