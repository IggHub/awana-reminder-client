import React from 'react';
import {Grid, Col, Row, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';

class CreateSchedule extends React.Component {
  render(){

    const dateError = (this.props.createScheduleErrorMessages["dateError"] === "") ? <div>error message for date goes here</div> : <div></div>
    const workerNameError = <div>error message for worker's name goes here</div>
    const phoneError = <div>error message for phone goes here</div>
    const messageError = <div>error message for message goes here</div>
    return (
      <Grid>
        <Row>
          <Col md={6} >
            <FormGroup>
              <h1>Create new schedule:</h1>
              <FormGroup>
                <ControlLabel>Enter Date:</ControlLabel>
                <FormControl type="date" onChange={this.props.handleDate} />
                {dateError}
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
                {workerNameError}
              </FormGroup>
              <FormGroup>
                <ControlLabel>Enter Phone:</ControlLabel>
                <FormControl placeholder="Enter phone in format of (123)-456-7890" onChange={this.props.handleWorkerPhone} />
                {phoneError}
              </FormGroup>
              <FormGroup>
                <ControlLabel>Enter Message:</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter message here" onChange={this.props.handleScheduleMessage}/>
                {messageError}
              </FormGroup>
              <Button bsStyle="info" onClick={this.props.validateSchedule}>Validate!</Button>
              <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
