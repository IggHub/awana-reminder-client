import React from 'react';
import {Grid, Col, Row, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

var options = [
  { value: 'one', label: 'One', whatever: 1 },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + val.label);
}


class Schedule extends React.Component {
  constructor(){
    super();
    this.state = {
      schedules: [],
      schedule: 'Some schedule',
      workers: [],
      selectWorkers: [],
      scheduledWorkers: [],
      worker: 'Sunny D',
      phone: '777-777-7777',
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
    this.clickWorker = this.clickWorker.bind(this);
    this.getScheduledWorkers = this.getScheduledWorkers.bind(this);
    this.mapWorkersToSelectWorkers = this.mapWorkersToSelectWorkers.bind(this);
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
    Client.postSchedule(this.state.date, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
    }).then(() => Client.postWorker(this.state.worker, this.state.phone, this.state.schedules[this.state.schedules.length - 1].id, (worker) => {
        this.setState({workers: this.state.workers.concat([worker])})
      })
    )
  };
  postWorker(){
    //just create worker, with schedule_id = nil
    Client.postWorker(this.state.worker, this.state.scheduleId, () => {
      console.log('hello post worker')
    })
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
    this.setState({phone: e.target.value}, () => console.log(this.state.phone))
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
  workersOptions(){

  }
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
    const createSchedule = this.state.creatable? <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} handleWorkerName={this.handleWorkerName} handleWorkerPhone={this.handleWorkerPhone}/> : <div></div>;
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <Select
              name="form-field-name"
              value="one"
              options={this.state.selectWorkers}
              onChange={logChange}
            />

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
        <h1>Workers</h1>

        <DropdownButton title="Dropdown" id={`dropdown1`}>
          {this.state.workers.map((worker, index) =>
            <MenuItem key={index} onClick={() => this.clickWorker(worker.name)} id={index} value={worker.name}>Workers: {worker.name}</MenuItem>
          )}
        </DropdownButton>
        {this.state.scheduledWorkers.map((worker, index) =>
          <li key={index}>{worker.name}</li>
        )}
        <h1>End workers</h1>

        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info" bsSize="large">+</Button>
      </Grid>
    )
  }
}

export default Schedule;
