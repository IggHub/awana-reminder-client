import React from 'react';
import {Grid, Col, Row, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import EnterDateInput from './EnterDateInput';
import EnterWorkerInput from './EnterWorkerInput';
import EnterPhoneInput from './EnterPhoneInput';
import EnterMessageInput from './EnterMessageInput';

class CreateSchedule extends React.Component {
  componentDidUpdate(){
    //this.props.validateSchedule();
  }
  render(){

    const dateError = (!this.props.createScheduleErrorMessages["dateError"]) ? <div>error message for date goes here</div> : <div></div>
    const workerNameError = (!this.props.createScheduleErrorMessages["workerNameError"]) ? <div>error message for worker's name goes here</div> : <div></div>
    const phoneError = (!this.props.createScheduleErrorMessages["phoneError"]) ? <div>error message for phone goes here</div> : <div></div>
    const messageError = (!this.props.createScheduleErrorMessages["messageError"]) ? <div>error message for message goes here</div> : <div></div>
    return (
      <Grid>
        <Row>
          <Col md={6} >

              <h1>Create new schedule:</h1>
              
              <EnterDateInput createScheduleErrorMessages={this.props.createScheduleErrorMessages} handleDate={this.props.handleDate}/>
              <EnterWorkerInput createScheduleErrorMessages={this.props.createScheduleErrorMessages} selectWorker={this.props.selectWorker} selectWorkers={this.props.selectWorkers} handleSelectWorker={this.props.handleSelectWorker} />
              <EnterPhoneInput createScheduleErrorMessages={this.props.createScheduleErrorMessages} handleWorkerPhone={this.props.handleWorkerPhone} />
              <EnterMessageInput createScheduleErrorMessages={this.props.createScheduleErrorMessages} handleScheduleMessage={this.props.handleScheduleMessage} />

              <Button bsStyle="info" onClick={this.props.validateSchedule}>Validate!</Button>
              <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>

          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
