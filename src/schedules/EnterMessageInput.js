import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class EnterMessageInput extends React.Component {
  render(){
    const messageError = (!this.props.createScheduleErrorMessages["messageError"]) ? <div>error message for message goes here</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Message:</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Enter message here" onChange={this.props.handleScheduleMessage}/>
        {messageError}
      </FormGroup>
    )
  }
}

export default EnterMessageInput;
