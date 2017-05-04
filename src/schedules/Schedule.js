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
  }
  postSchedule(){
    Client.postSchedule(this.state.date, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
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
  componentDidMount(){
    this.getSchedules();
    this.getWorkers();
  };

  render(){
    const editSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <div></div>;
    const createSchedule = this.state.creatable? <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} /> : <div></div>;
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
            <MenuItem key={index} id={index}>Workers: {worker.name}</MenuItem>
          )}
        </DropdownButton>
        <h1>End workers</h1>
        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info" bsSize="large">+</Button>
      </Grid>
    )
  }
}

export default Schedule;
