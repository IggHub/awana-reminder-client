import React from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import Client from '../utils/Client';
import DisplaySchedules from './DisplaySchedules';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';

import '../Buttons.css';

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
      newWorkers:[],
      workerTemp1: '',
      workerTemp2: '',
      workerTemp3: '',
      rosters: [],
      worker: '',
      phone: '',
      newPhones: [],
      phoneTemp1: '',
      phoneTemp2: '',
      phoneTemp3: '',
      texts: [],
      message: "",
      date: '',
      reminderDate: '',
      userId: 1,
      scheduleId: '',
      editable: false,
      creatable: true,
      dateErrorMessage:'',
      workerErrorMessage: '',
      workerErrorMessages: [{message: ""}, {message: ""}, {message: ""}],
      workerErrorMessageTemp1: '',
      workerErrorMessageTemp2: '',
      workerErrorMessageTemp3: '',
      phoneErrorMessage: '',
      messageErrorMessage: '',
      workerHolderCounter: 1
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
    this.incrementWorkerHolderCounter = this.incrementWorkerHolderCounter.bind(this);
    this.decrementWorkerHolderCounter = this.decrementWorkerHolderCounter.bind(this);
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
  };
  getRosters(){
    Client.getRosters((rosters) => {
      this.setState({rosters})
    })
  };
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
    if(this.state.date === "" || this.state.message === "" || this.state.newWorkers === []){
      console.log("ERROR! One or more fields are blank")
    } else {
      let tempNewWorkers = this.state.newWorkers.slice();
      let labelToNameArrayMap = tempNewWorkers.map(function(worker) {
        return {
          name: worker.label,
          phone: worker.phone
        }
      }).filter((el) => {
        return el.name.length > 0;
      })
      //need to filter so empty arrays won't show up
      Client.postSchedule(this.state.date, this.state.message, labelToNameArrayMap, (schedule) => {
        this.setState({schedules: this.state.schedules.concat([schedule])})
      })
    }
  };

  postMessage(){
    Client.postMessage(this.state.message, this.state.newWorkers, this.state.date);
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
  handleDate(date){
    const dateClone = date;
    const dateTimeYesterday = dateClone.set({'hour': 11, 'minute': 15, 'second': 30})
    this.setState({reminderDate: dateTimeYesterday._d, date: date._d}, () => console.log("1 day ago at 7 PM: " + this.state.date));
    this.validateDate();
  };
  handleWorkerName(e){
    this.setState({worker: e.target.value});
  };
  handleWorkerPhone(id, e){
    this.setState({phone: e.target.value});
    let newPhoneArray = this.state.newWorkers.slice();
    if(id === 1){
      newPhoneArray = [{label: this.state.workerTemp1, phone: e.target.value}, {label: this.state.workerTemp2, phone: this.state.phoneTemp2}, {label: this.state.workerTemp3, phone: this.state.phoneTemp3}];
      this.setState({phoneTemp1: e.target.value});
    } else if (id === 2) {
      newPhoneArray = [{label: this.state.workerTemp1, phone: this.state.phoneTemp1}, {label: this.state.workerTemp2, phone: e.target.value}, {label: this.state.workerTemp3, phone: this.state.phoneTemp3}];
      this.setState({phoneTemp2: e.target.value});
    } else if (id === 3) {
      newPhoneArray = [{label: this.state.workerTemp1, phone: this.state.phoneTemp1}, {label: this.state.workerTemp2, phone: this.state.phoneTemp2}, {label: this.state.workerTemp3, phone: e.target.value}]
      this.setState({phoneTemp3: e.target.value});
    }

    this.setState({newWorkers: newPhoneArray});
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
  handleSelectWorker(val, id){
    //this.setState({selectWorker: val.label});
    let newArray = this.state.newWorkers.slice();
    if (id === 1) {
      newArray = [{label: val.label, phone: this.state.phoneTemp1}, {label: this.state.workerTemp2, phone: this.state.phoneTemp2}, {label: this.state.workerTemp3, phone: this.state.phoneTemp3}]
      this.setState({workerTemp1: val.label});
    } else if (id === 2) {
      newArray = [{label: this.state.workerTemp1, phone: this.state.phonTemp1}, {label: val.label, phone: this.state.phoneTemp2}, {label: this.state.workerTemp2, phone: this.state.phoneTemp3}]
      this.setState({workerTemp2: val.label})
    } else if (id === 3){
      newArray = [{label: this.state.workerTemp1, phone: this.state.phoneTemp1}, {label: this.state.workerTemp2, phone: this.state.phoneTemp2}, {label: val.label, phone: this.state.phoneTemp3}]
      this.setState({workerTemp3: val.label})
    }

    //instead of setState newWorkers, try to append it to current newWorkers. Remember, their ID is different!
    this.setState({newWorkers: newArray})

    this.validateWorker();
  };
  clickWorker(worker){
    this.setState({worker})
  };
  incrementWorkerHolderCounter(){
    if (this.state.workerHolderCounter < 3) {
      this.setState({workerHolderCounter: this.state.workerHolderCounter + 1}, () => console.log(this.state.workerHolderCounter))
    } else {
      console.log("Can't put too many workers!")
    }
  };
  decrementWorkerHolderCounter(id){
    if (this.state.workerHolderCounter > 1) {
      this.setState({workerHolderCounter: this.state.workerHolderCounter - 1}, () => console.log(this.state.workerHolderCounter));
      let tempNewWorkers = this.state.newWorkers.slice();
      if (id === 3) {
        tempNewWorkers[id - 1] = {label: "", phone: ""};
      } else if (id === 2){
        if (!this.state.workerTemp3){
          tempNewWorkers[id - 1] = {label: "", phone: ""}
        } else {
          tempNewWorkers[id - 1] = {label: this.state.workerTemp2, phone: "123-456-7890"};
        }
        if (this.state.workerTemp3){
          tempNewWorkers[id - 1] = {label: this.state.workerTemp3, phone: "123-456-7890"};
        }
        tempNewWorkers[id] = {label: "", phone: ""};
      } else if (id === 1) {
        tempNewWorkers[id - 1] = {label: this.state.workerTemp2, phone: "111-22-3333"};
        tempNewWorkers[id] = {label: this.state.workerTemp3, phone: "999-888-7777"};
        tempNewWorkers[id + 1] = {label: "", phone: ""};
      }
      //tempNewWorkers[last] still has value!

      this.setState({newWorkers: tempNewWorkers});
      //tempNewWorkersDecrement[id - 1] = {name: "", phone: ""}
      //this.setState({newWorkers: tempNewWorkersDecrement})
    } else {
      console.log("Need to have at least a worker!")
    }
  };
  getSchedulesAndTexts(){
    this.getSchedules();
    this.getWorkers();
    //this.getRosters();
    //this.getTexts();
  };
  componentDidMount(){
    this.getSchedulesAndTexts();
  };

  validateDate(){
    if(this.state.date === "") {
      this.setState({dateErrorMessage: "date is EMPTY"})
    }
  };

  validateWorker(){
    let newWorkersNameArray = this.state.newWorkers.map((worker) => {return worker.label});
    let workerErrorMessagesTemp = this.state.workerErrorMessages;
    if(newWorkersNameArray[0] === "" || newWorkersNameArray === []){
      workerErrorMessagesTemp[0] = {message: "Worker 1 is empty"};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    } else if (newWorkersNameArray[0] !== "") {
      workerErrorMessagesTemp[0] = {message: ""};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    }
    if (newWorkersNameArray[1] === "" || newWorkersNameArray === []) {
      workerErrorMessagesTemp[1] = {message: "Worker 2 is empty"};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    } else if (newWorkersNameArray[1] !== "") {
      workerErrorMessagesTemp[1] = {message: ""};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    }
    if (newWorkersNameArray[2] === "" || newWorkersNameArray === []) {
      workerErrorMessagesTemp[2] = {message: "Worker 3 is empty"};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    } else if (newWorkersNameArray[2] !== "") {
      workerErrorMessagesTemp[2] = {message: ""};
      this.setState({workerErrorMessages: workerErrorMessagesTemp});
    }

/*
    if (this.state.selectWorker.length >= 70) {
      this.setState({workerErrorMessage: "worker name is too long"});
    } else if(this.state.selectWorker === "" || this.state.selectWorker === undefined) {
      this.setState({workerErrorMessage: "worker is EMPTY"});
    } else if(this.state.selectWorker.length < 70) {
    }
*/
  };

  validatePhone(){
    if(this.state.phone.length === 0) {
      this.setState({phoneErrorMessage: "phone is EMPTY"})
    }
  };
  validateMessage(){
    if (this.state.message === ""){
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
                                                    newWorkers={this.state.newWorkers}
                                                    handleSelectWorker={this.handleSelectWorker}
                                                    selectWorker={this.state.selectWorker}
                                                    validateSchedule={this.validateSchedule}
                                                    dateErrorMessage={this.state.dateErrorMessage}
                                                    workerErrorMessage={this.state.workerErrorMessage}
                                                    workerErrorMessages={this.state.workerErrorMessages}
                                                    phoneErrorMessage={this.state.phoneErrorMessage}
                                                    messageErrorMessage={this.state.messageErrorMessage}
                                                    phone={this.state.phone}
                                                    newPhones={this.state.newPhones}
                                                    message={this.state.message}
                                                    validatePhone={this.validatePhone}
                                                    workerHolderCounter={this.state.workerHolderCounter}
                                                    incrementWorkerHolderCounter={this.incrementWorkerHolderCounter}
                                                    decrementWorkerHolderCounter={this.decrementWorkerHolderCounter}
                                                    /> : <div></div>;

    return (
      <Grid>
        <Row>
          <Col>
            <h1>Schedules:</h1>
          </Col>
        </Row>
        <Row>
          <DisplaySchedules
            schedules={this.state.schedules}
            handleEdit={this.handleEdit}
            deleteSchedule={this.deleteSchedule}
            workers={this.state.workers}
            rosters={this.state.rosters}
            texts={this.state.texts}
          />
        </Row>

        <Row>
          {editSchedule}
          {createSchedule}
        </Row>

        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info" bsSize="large">+</Button>
        <hr />
        <Button bsStyle="danger" onClick={() => console.log(this.state.workers)}>Get workers</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.schedules)}>Get schedules</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.message)}>Get message</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.selectWorker)}>Get name</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.phone)}>Get phone</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.workerErrorMessages)}>Get Worker error messages</Button>
        <Button bsStyle="danger" onClick={() => console.log(this.state.newWorkers)}>Get Workers</Button>
        <Button bsStyle="info" onClick={this.postMessage}>Send Message</Button>
      </Grid>
    )
  }
}

export default Schedule;
