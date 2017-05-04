import React from 'react';
import Client from '../utils/Client';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';

class Schedule extends React.Component {
  constructor(){
    super();
    this.state = {
      schedules: [],
      schedule: 'Some schedule',
      date: '',
      userId: 1,
      scheduleId: '',
      prevId: 0,
      editable: false
    }
    this.handleDate = this.handleDate.bind(this);
    this.postSchedule = this.postSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  };
  getSchedules(){
    Client.getSchedules((schedules) => {
      this.setState({schedules})
    })
  };
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
  handleEdit(id){
    this.setState({editable: false})
    if (id === this.state.scheduleId){
      this.setState({
        scheduleId: id
      });
    } else {
      this.setState({
        editable: !this.state.editable,
        scheduleId: id
      });
    }
  }
  componentDidMount(){
    this.getSchedules();
  };

  render(){
    const editOrCreateSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} />
    return (
      <div>
        <h1>Hello from schedulejS!</h1>
        <ul>
          {this.state.schedules.map((schedule, index) =>
            <li key={index}>Schedule For: <a href="#" onClick={() => this.handleEdit(schedule.id)}> {schedule.date} (Schedule ID: {schedule.id}) </a> <a href="#" onClick={() => this.deleteSchedule(schedule.id)}>X</a></li>
          )}
        </ul>
        {editOrCreateSchedule}
      </div>
    )
  }
}

export default Schedule;
