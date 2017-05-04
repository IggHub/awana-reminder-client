import React from 'react';
import {Grid, Col, Row, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

class CreateSchedule extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={6} >
            <FormGroup>
              <h1>Create new schedule:</h1>
              <ControlLabel>Enter Date:</ControlLabel>
              <FormControl type="date" onChange={this.props.handleDate} />
              {/*<p>Date: {this.props.date}</p> */}
              <br />
              <ControlLabel>Enter Worker:</ControlLabel>
              <FormControl placeholder="Enter worker" />
              <br />
              <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
