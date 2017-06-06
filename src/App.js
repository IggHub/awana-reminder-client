import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import Schedule from './schedules/Schedule';
//import ValidationTest from './ValidationTest';
import Navigation from '../src/schedules/Navigation';
import Footer from '../src/schedules/Footer';

const background = {
  backgroundColor: "#EEECE0"
};

class App extends Component {

  render() {
    return (
      <div className="App" style={background}>
        <Row>
          <Navigation />
        </Row>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Schedule />
          </Col>
        </Row>
        <Row>
          <Footer />
        </Row>
      </div>
    );
  }
}

export default App;
