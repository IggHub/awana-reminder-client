import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Schedule from './schedules/Schedule';
import ValidationTest from './ValidationTest';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="error-message">Test error message</div>
              <ValidationTest />
              <Schedule />

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
