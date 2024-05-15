import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

 const NavBar =() => {
    const token = sessionStorage.getItem('token');

    const logOut = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.reload(true);
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            !token ?
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                : <></>
                        }

                        {
                            !token ?
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                                : <></>
                        }

                        {
                            token ?
                                <Nav.Link onClick={logOut} as={Link} to="/">Log out</Nav.Link>
                                : <></>
                        }

                        {
                            !token ?
                                <Nav.Link as={Link} to="history">History</Nav.Link>
                                : <></>
                        }


                    </Nav>
                </Container>
            </Navbar>

            <Outlet />


        </>
    );

}

export default NavBar;