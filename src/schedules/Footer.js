import React from 'react';
import {Navbar, Nav, Row, Col} from 'react-bootstrap';

const footer = {
  border: "none",
  color: "#817878",
  overflow: "hidden"
}
class Footer extends React.Component {
  render(){
    return (
      <Navbar fluid style={footer}>
        <Row>
          <Col sm={1}>
          <Navbar.Brand>
            <a href="#" style={footer}>AWANAFY</a>
          </Navbar.Brand>
          </Col>

          <Col sm={1} smOffset={1}>
            <Nav>
              <Row>
                <a href="#" style={footer}>About</a>
              </Row>
              <Row>
                <a href="#" style={footer}>Help</a>
              </Row>
              <Row>
                <a href="#" style={footer}>Contacts</a>
              </Row>
            </Nav>
          </Col>
        </Row>
      </Navbar>
    )
  }
}

export default Footer;
