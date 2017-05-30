import React from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';
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
    var workerHolder = [];
    for(var i = 1; i <= 3; i++){
      workerHolder.push(
        <EnterWorkerInput
          key={i}
          id={i}
          workerHolderCounter={this.props.workerHolderCounter}
          selectWorker={this.props.selectWorker}
          selectWorkers={this.props.selectWorkers}
          handleSelectWorker={this.props.handleSelectWorker}
          workerErrorMessage={this.props.workerErrorMessage}
          workerErrorMessages={this.props.workerErrorMessages}
          incrementWorkerHolderCounter={this.props.incrementWorkerHolderCounter}
          decrementWorkerHolderCounter={this.props.decrementWorkerHolderCounter}
          newWorkers={this.props.newWorkers}
          newPhones={this.props.newPhones}
          handleWorkerPhone={this.props.handleWorkerPhone}
        />
      )
    }
    return (
      <Grid>
        <Row>
          <Col md={6} >

              <h1>Create new schedule:</h1>

              <EnterDateInput handleDate={this.props.handleDate} dateErrorMessage={this.props.dateErrorMessage} date={this.props.date}/>
              {workerHolder}

              <EnterMessageInput message={this.props.message} handleScheduleMessage={this.props.handleScheduleMessage} messageErrorMessage={this.props.messageErrorMessage} />

              <Button bsStyle="info" onClick={this.props.validateSchedule}>Validate!</Button>
              <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>
              <Button bsStyle="info" onClick={() => console.log(this.props.newWorkers)}>Display new workers</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
