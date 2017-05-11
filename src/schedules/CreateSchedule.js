import React from 'react';
import {Grid, Col, Row, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';

class CreateSchedule extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={6} >
            <FormGroup>
              <h1>Create new schedule:</h1>
              <FormGroup>
                <ControlLabel>Enter Date:</ControlLabel>
                <FormControl type="date" onChange={this.props.handleDate} />
              </FormGroup>
              {/*<p>Date: {this.props.date}</p> */}
              <FormGroup>
                <ControlLabel>Enter Worker:</ControlLabel>
                <Creatable
                  name="form-field-name"
                  value={this.props.selectWorker}
                  options={this.props.selectWorkers}
                  onChange={this.props.handleSelectWorker}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Enter Phone:</ControlLabel>
                <FormControl placeholder="Enter phone" onChange={this.props.handleWorkerPhone} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Enter Message:</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter message here" onChange={this.props.handleScheduleMessage}/>
              </FormGroup>

              <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
