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
    let date = this.state.date;
    Client.postSchedule(date, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
    })
  };
  updateSchedule(){
    Client.updateSchedule(9, this.state.date, () => {
      this.setState({schedules: this.state.schedules})
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
  handleEdit(e){
    this.setState({editable: !this.state.editable})
  }
  componentDidMount(){
    this.getSchedules();
  };

  render(){
    const editOrCreate = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} />
    return (
      <div>
        <h1>Hello from schedulejS!</h1>
        <ul>
          {this.state.schedules.map((schedule, index) =>
            <li key={index}>Schedule For: <a href="#" onClick={this.handleEdit}> {schedule.date} (Schedule ID: {schedule.id}) </a> <a href="#" onClick={() => this.deleteSchedule(schedule.id)}>X</a></li>
          )}
        </ul>


        {editOrCreate}

      </div>
    )
  }
}

export default Schedule;
