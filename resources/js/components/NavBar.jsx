import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavBar() {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Login</Nav.Link>
                        <Nav.Link href="#Register">Register</Nav.Link>
                        <Nav.Link href="#logout">Log out</Nav.Link>
                        <Nav.Link href="#History">History</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );

}