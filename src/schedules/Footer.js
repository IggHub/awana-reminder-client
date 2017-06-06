import React from 'react';
import {Navbar, Nav, NavItem, Row, Col} from 'react-bootstrap';

const footer = {
  border: "none",
  color: "#817878",
  overflow: "hidden"
}
class Footer extends React.Component {
  render(){
    return (
      <Navbar style={footer}>
        <Row>
          <Col sm={1}>
          <Navbar.Brand>
            <a href="#" style={footer}>AWANAFY</a>
          </Navbar.Brand>
          </Col>

          <Col sm={1} smOffset={1}>
            <Nav>
              <Row>
                <NavItem>About</NavItem>
              </Row>
              <Row>
                <NavItem>Help</NavItem>
              </Row>
              <Row>
                <NavItem>Contacts</NavItem>
              </Row>
            </Nav>
          </Col>
        </Row>
      </Navbar>
    )
  }
}

export default Footer;
