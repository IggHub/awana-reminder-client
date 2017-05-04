import React from 'react';

class UpdateSchedule extends React.Component {
  render(){
    return (
      <div>
        <h1>Edit Schedule</h1>
        <input type="date" value={this.props.date} onChange={this.props.handleDate} />
        <p>Date: {this.props.date}</p>
        <button type="button" onClick={this.props.updateSchedule}>Submit Change</button>
      </div>
    )
  }
}

export default UpdateSchedule;
