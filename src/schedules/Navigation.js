import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const nav = {
  backgroundColor: "#FFA17B",
  color: "#FFFFFF",
  padding: "5px 0px 5px 0px"
};

class Navigation extends React.Component {
  render(){
    return (
      <Navbar fluid style={nav} fixedTop>
        <Navbar.Brand>
          <a href="#" style={nav}>AWANAFY</a>
        </Navbar.Brand>
        <Nav pullRight>
          <NavItem><a href="#" style={nav}>Logout</a></NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;
