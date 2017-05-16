import React from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import Client from '../utils/Client';
import DisplaySchedules from './DisplaySchedules';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';
import PhoneHelper from '../utils/PhoneHelpers';

const addButtonStyle={
  position: 'fixed',
  bottom: '25px',
  right: '25px',
  borderRadius: '25px'
};

class Schedule extends React.Component {
  constructor(){
    super();
    this.state = {
      schedules: [],
      schedule: 'Some schedule',
      workers: [],
      selectWorkers: [],
      selectWorker: '',
      scheduledWorkers: [],
      worker: '',
      phone: '',
      texts: [],
      message: "",
      date: '',
      userId: 1,
      scheduleId: '',
      prevId: 0,
      editable: false,
      creatable: true,
      dateErrorMessage:'',
      workerErrorMessage: '',
      phoneErrorMessage: '',
      messageErrorMessage: ''
    }
    this.handleDate = this.handleDate.bind(this);
    this.postSchedule = this.postSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleWorkerName = this.handleWorkerName.bind(this);
    this.handleWorkerPhone = this.handleWorkerPhone.bind(this);
    this.handleScheduleMessage = this.handleScheduleMessage.bind(this);
    this.handleSelectWorker = this.handleSelectWorker.bind(this);
    this.clickWorker = this.clickWorker.bind(this);
    this.getScheduledWorkers = this.getScheduledWorkers.bind(this);
    this.mapWorkersToSelectWorkers = this.mapWorkersToSelectWorkers.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.validateSchedule = this.validateSchedule.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.validateWorker = this.validateWorker.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateMessage = this.validateMessage.bind(this);
    this.handleValidationState = this.handleValidationState.bind(this);
  };
  getSchedules(){
    Client.getSchedules((schedules) => {
      this.setState({schedules})
    })
  };
  getWorkers(){
    Client.getWorkers((workers) => {
      this.setState({workers});
    }).then(() => this.mapWorkersToSelectWorkers(this.state.workers))
  };
  getScheduledWorkers(scheduleId){
    Client.getWorkers((scheduledWorkers) => {
      this.setState({scheduledWorkers})
    }, scheduleId)
  };
  getTexts(){
    Client.getTexts((texts) => {
      this.setState({texts})
    })
  }
  mapWorkersToSelectWorkers(workers){
    let selectWorkers = workers.map(function(worker){
      return {
        value: worker.name,
        label: worker.name,
        workerId: worker.id,
        phone: worker.phone
      }
    })
    this.setState({selectWorkers})
  };
  postSchedule(){
    //if it fails validation, don't submit. If it passes validation, do the below:
    if(this.state.date === "" || this.state.message === "" || this.state.phone === "" || this.state.selectWorker === undefined || this.state.selectWorker === ""){
      console.log("ERROR! One or more fields are blank")
    } else {
      Client.postSchedule(this.state.date, (schedule) => {
        this.setState({schedules: this.state.schedules.concat([schedule])})
      }).then(() => Client.postWorker(this.state.selectWorker, this.state.phone, this.state.schedules[this.state.schedules.length - 1].id, (worker) => {
          this.setState({workers: this.state.workers.concat([worker])})
        })
      )
        .then(() => Client.postText(this.state.message, this.state.schedules[this.state.schedules.length - 1].id, (message) => {
          this.setState({texts: this.state.texts.concat([message])})
        })
      )
    }
  };
  postWorker(){
    Client.postWorker(this.state.worker, this.state.scheduleId, () => {
      console.log('hello post worker')
    })
  };
  postMessage(){
    Client.postMessage(this.state.message, this.state.phone, this.state.scheduleId);
  };
  updateSchedule(){
    Client.updateSchedule(this.state.scheduleId, this.state.date, () => {
      this.setState({schedules: this.state.schedules});
      this.getSchedules();
    })
  };
  deleteSchedule(schedule){
    Client.deleteSchedule(schedule, () => {
      this.getSchedules();
    })
  };
  handleDate(e){
    this.setState({date: e.target.value})
    this.validateDate();
  };
  handleWorkerName(e){
    this.setState({worker: e.target.value});
  };
  handleWorkerPhone(e){
    this.setState({phone: e.target.value});
    this.validatePhone();
  };
  handleScheduleMessage(e){
    this.setState({message: e.target.value});
    this.validateMessage();
  };
  handleEdit(id, date){
    this.setState({editable: !this.state.editable, date: date, creatable: false})
    if (id === this.state.scheduleId){
      this.setState({
        scheduleId: id
      }, () => this.getScheduledWorkers(this.state.scheduleId))
    } else if (id !== this.state.scheduleId) {
      this.setState({
        editable: true,
        scheduleId: id
      }, () => this.getScheduledWorkers(this.state.scheduleId));
    };
  };
  handleCreate(){
    this.setState({editable: false, creatable: !this.state.creatable})
  };
  handleSelectWorker(val){
    this.setState({selectWorker: val.label});
    this.validateWorker();
  };
  clickWorker(worker){
    this.setState({worker})
  };
  getSchedulesWorkersAndTexts(){
    this.getSchedules();
    this.getWorkers();
    this.getTexts();

  };
  componentDidMount(){
    this.getSchedulesWorkersAndTexts();
  };

  validateDate(){
    if(this.state.date === "") {
      this.setState({dateErrorMessage: "date is EMPTY"}, () => console.log("date:" + this.state.date))
    }
  };

  validateWorker(){
    if (this.state.selectWorker.length >= 70) {
      this.setState({workerErrorMessage: "worker name is too long"});
    } else if(this.state.selectWorker === "") {
      this.setState({workerErrorMessage: "worker is EMPTY"});
    }
  };

  validatePhone(){
    if (PhoneHelper.condensePhone(this.state.phone).length >= 10) {
      this.setState({phoneErrorMessage: "phone is too long"})
    } else if(this.state.phone.length === 0) {
      this.setState({phoneErrorMessage: "phone is EMPTY"})
    }
  };
  validateMessage(){
    if(this.state.message.length > 140) {
      this.setState({messageErrorMessage: "Message exceeds 140 characters limit"});
    } else if (this.state.message === ""){
      this.setState({messageErrorMessage: "Message is EMPTY"})
    }
  };
  validateSchedule(){
    this.validateMessage();
    this.validateDate();
    this.validatePhone();
    this.validateWorker();
  };
  handleValidationState(validatee){
    if(validatee === "" || validatee === undefined){
      return "error"
    } else {
      return "success"
    }
  };

  render(){
    const editSchedule = this.state.editable ? <UpdateSchedule
                                                    handleDate={this.handleDate}
                                                    date={this.state.date}
                                                    updateSchedule={this.updateSchedule}
                                                    handleWorkerName={this.handleWorkerName}
                                                    handlWorkerPhone={this.handleWorkerPhone}
                                                    scheduledWorkers={this.state.scheduledWorkers} /> : <div></div>;
    const createSchedule = this.state.creatable? <CreateSchedule
                                                    handleDate={this.handleDate}
                                                    date={this.state.date}
                                                    postSchedule={this.postSchedule}
                                                    handleWorkerName={this.handleWorkerName}
                                                    handleScheduleMessage={this.handleScheduleMessage}
                                                    handleWorkerPhone={this.handleWorkerPhone}
                                                    selectWorkers={this.state.selectWorkers}
                                                    handleSelectWorker={this.handleSelectWorker}
                                                    selectWorker={this.state.selectWorker}
                                                    validateSchedule={this.validateSchedule}
                                                    dateErrorMessage={this.state.dateErrorMessage}
                                                    workerErrorMessage={this.state.workerErrorMessage}
                                                    phoneErrorMessage={this.state.phoneErrorMessage}
                                                    messageErrorMessage={this.state.messageErrorMessage}
                                                    phone={this.state.phone}
                                                    message={this.state.message}
                                                    validatePhone={this.validatePhone} /> : <div></div>;

    return (
      <Grid>
        <Row>
          <Col><h1>Hello from schedulejS!</h1></Col>
        </Row>
        <Row>
          <DisplaySchedules
            schedules={this.state.schedules}
            handleEdit={this.handleEdit}
            deleteSchedule={this.deleteSchedule}
            workers={this.state.workers}
            texts={this.state.texts}
          />
        </Row>
        <Row>
          {editSchedule}
          {createSchedule}
        </Row>

        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info" bsSize="large">+</Button>
        <hr />
        <Button bsStyle="info" onClick={this.postMessage}>Send Message</Button>
      </Grid>
    )
  }
}

export default Schedule;
