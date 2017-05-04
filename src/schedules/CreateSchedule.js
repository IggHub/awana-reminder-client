import React from 'react';

class CreateSchedule extends React.Component {
  render(){
    return (
      <div>
        <h1>Create new schedule:</h1>
        <input type="date" onChange={this.props.handleDate} />
        <p>Date: {this.props.date}</p>
        <button type="button" onClick={this.props.postSchedule}>Submit New</button>
      </div>
    )
  }
}

export default CreateSchedule;
