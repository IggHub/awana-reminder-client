import React from 'react';
import Client from '../utils/Client';

class Schedule extends React.Component {
  constructor(){
    super();
    this.state = {
      schedules: [],
      schedule: 'Some schedule'
    }
  };
  getSchedules(){
    Client.getSchedules((schedules) => {
      this.setState({
        schedules
      })
    })
  };
  componentDidMount(){
    this.getSchedules();
  }
  render(){
    console.log(this.state.schedules);
    return (
      <div>
        <h1>Hello from schedulejS!</h1>
        <ul>
          {this.state.schedules.map((schedule, index) =>
            <li key={index}>Schedule For: {schedule.date}</li>
          )}
        </ul>

      </div>
    )
  }
}

export default Schedule;
