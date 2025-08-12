import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom';

function mainNavBar() {
  return (
    <div className="vh-90">
      
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" >Dice Roller</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/roll_a_dice">Roll a dice</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/roll_multiple_dice">Multiple dice roll</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/draw_a_card">Draw a card</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default mainNavBar;