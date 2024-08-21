import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../Store/authContext";

const Header: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    };

    const loginText= "Zaloguj";
    const registerText= "Zarejestruj";
    const logoutText= "Wyloguj";
    return (    
        <Navbar expand="lg" bg="light" className="navbar">
            <Navbar.Brand href="#home">SplenDuel</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link href="/Home" className="header-button">Strona główna</Nav.Link>
                    {isLoggedIn && <button onClick={logoutHandler} className="header-button">
                        {logoutText}</button>}
                    {!isLoggedIn && <Link to="/Login" className="header-button">{loginText}</Link>}
                    {!isLoggedIn && <Link to="/Register" className="header-button">{registerText}</Link>}
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;