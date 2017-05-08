import React from 'react';
import {Grid, Col, Row, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class UpdateSchedule extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h1>Edit Schedule for {this.props.date}</h1>
            <ControlLabel>Enter Date:</ControlLabel>
            <FormControl type="date" value={this.props.date} onChange={this.props.handleDate} />
            {/*<p>Date: {this.props.date}</p> */}
            <br />
            {this.props.scheduledWorkers.map((worker, index) =>
              <FormGroup key={index}>
                <ControlLabel>Enter Worker (ID: {worker.id}):</ControlLabel>
                <FormControl placeholder="Enter Worker" value={worker.name} onChange={this.props.handleWorkerName} />
                <br />
                <ControlLabel>Enter Phone:</ControlLabel>
                <FormControl placeholder="Enter phone" value={worker.phone} onChange={this.props.handleWorkerPhone} />
                <br />
              </FormGroup>
            )}
            <Button bsStyle="info" onClick={this.props.updateSchedule}>Submit Change</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UpdateSchedule;
