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
      worker: 'Sunny D',
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
    this.clickWorker = this.clickWorker.bind(this);
  };
  getSchedules(){
    Client.getSchedules((schedules) => {
      this.setState({schedules})
    })
  };
  getWorkers(){
    Client.getWorkers((workers) => {
      this.setState({workers})
    })
  };
  postSchedule(){

    Client.postSchedule(this.state.date, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
    }).then(() => Client.postWorker(this.state.worker, this.state.schedules[this.state.schedules.length - 1].id, (worker) => {
      this.setState({workers: this.state.workers.concat([worker])})
    })
  )

  };
  postWorker(){
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
    this.setState({worker: e.target.value}, () => console.log(this.state.worker))
  };
  handleEdit(id, date){
    this.setState({editable: !this.state.editable, date: date, creatable: false})
    //console.log('editable: ', this.state.editable)
    if (id === this.state.scheduleId){
      this.setState({
        scheduleId: id
      });
    } else if (id !== this.state.scheduleId) {
      this.setState({
        editable: true,
        scheduleId: id
      });
    }
  };
  handleCreate(){
    this.setState({editable: false, creatable: !this.state.creatable})
  };
  clickWorker(worker){
    this.setState({
      worker
    })
  };
  componentDidMount(){
    this.getSchedules();
    this.getWorkers();
  };

  render(){
    const editSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <div></div>;
    const createSchedule = this.state.creatable? <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} handleWorkerName={this.handleWorkerName} /> : <div></div>;
    return (
      <Grid>
        <Row>
          <Col>
            <h1>Hello from schedulejS!</h1>
          </Col>
        </Row>
        <Row>
          <DisplaySchedules
            schedules={this.state.schedules}
            handleEdit={this.handleEdit}
            deleteSchedule={this.deleteSchedule}/>
        </Row>
        <Row>
          {editSchedule}
          {createSchedule}
        </Row>
        <h1>Workers</h1>

        <DropdownButton title="Dropdown this" id={`dropdown1`}>
          {this.state.workers.map((worker, index) =>
            <MenuItem key={index} onClick={() => this.clickWorker(worker.name)} id={index} value={worker.name}>Workers: {worker.name}</MenuItem>
          )}
        </DropdownButton>
        <h1>End workers</h1>

        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info" bsSize="large">+</Button>
      </Grid>
    )
  }
}

export default Schedule;
