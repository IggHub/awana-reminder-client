import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../Error.css';

class EnterMessageInput extends React.Component {
  render(){
    const messageError = (this.props.message === "") ? <div className="error-message">{this.props.messageErrorMessage}</div> : <div></div>
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
