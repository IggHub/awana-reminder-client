import React from 'react';
import {Grid, Col, Row, Button, DropdownButton, MenuItem} from 'react-bootstrap';

import Client from '../utils/Client';
import DisplaySchedules from './DisplaySchedules';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';

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
      worker: 'Sunny D',
      phone: '777-777-7777',
      message: "Don't be late!",
      date: '',
      userId: 1,
      scheduleId: '',
      prevId: 0,
      editable: false,
      creatable: true,
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
  mapWorkersToSelectWorkers(workers){
    let selectWorkers = workers.map(function(worker){
      return {
        value: worker.name,
        label: worker.name,
        workerId: worker.id,
        phone: worker.phone
      }
    })
    this.setState({selectWorkers}, () => console.log(this.state.selectWorkers))
  };
  postSchedule(){
    Client.postSchedule(this.state.date, this.state.message, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
    }).then(() => Client.postWorker(this.state.selectWorker, this.state.phone, this.state.schedules[this.state.schedules.length - 1].id, (worker) => {
        this.setState({workers: this.state.workers.concat([worker])})
      })
    )
  };
  postWorker(){
    Client.postWorker(this.state.worker, this.state.scheduleId, () => {
      console.log('hello post worker')
    })
  };
  postMessage(){
    Client.postMessage(this.state.message);
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
  };
  handleWorkerName(e){
    this.setState({worker: e.target.value})
  };
  handleWorkerPhone(e){
    this.setState({phone: e.target.value})
  };
  handleScheduleMessage(e){
    this.setState({message: e.target.value})
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
    this.setState({
      selectWorker: val.label
    }, () => console.log(this.state.selectWorker))
  };
  clickWorker(worker){
    this.setState({
      worker
    }, () => console.log(this.state.worker))
  };
  componentDidMount(){
    this.getSchedules();
    this.getWorkers();

  };

  render(){
    const editSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} handleWorkerName={this.handleWorkerName} handlWorkerPhone={this.handleWorkerPhone} scheduledWorkers={this.state.scheduledWorkers} /> : <div></div>;
    const createSchedule = this.state.creatable? <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} handleWorkerName={this.handleWorkerName} handleScheduleMessage={this.handleScheduleMessage} handleWorkerPhone={this.handleWorkerPhone} selectWorkers={this.state.selectWorkers} handleSelectWorker={this.handleSelectWorker} selectWorker={this.state.selectWorker} /> : <div></div>;
    return (
      <Grid>
        <Row>
          <Col md={6}>


          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Hello from schedulejS!</h1>
          </Col>
        </Row>
        <Row>
          <DisplaySchedules
            schedules={this.state.schedules}
            handleEdit={this.handleEdit}
            deleteSchedule={this.deleteSchedule}
            workers={this.state.workers}
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
