import React from 'react';
import {Grid, Col, Row, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Select, Creatable} from 'react-select';
import 'react-select/dist/react-select.css';

function logChange(val) {
  console.log("Selected: " + val.label);
}


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
              <Creatable
                name="form-field-name"
                value={this.props.selectWorker}
                options={this.props.selectWorkers}
                onChange={this.props.handleSelectWorker}
              />
              <br />
              <ControlLabel>Enter Phone:</ControlLabel>
              <FormControl placeholder="Enter phone" onChange={this.props.handleWorkerPhone} />
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
