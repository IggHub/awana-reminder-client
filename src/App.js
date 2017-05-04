import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import Schedule from './schedules/Schedule';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Schedule />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
