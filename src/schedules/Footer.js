import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const footer = {
  border: "none",
  color: "#817878"
}
class Footer extends React.Component {
  render(){
    return (
      <Navbar style={footer}>
        <Navbar.Brand>
          <a href="#" style={footer}>AWANAFY</a>
        </Navbar.Brand>
        <Nav>
          <NavItem>About</NavItem>
          <NavItem>Help</NavItem>
          <NavItem>Contacts</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Footer;
