import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../Error.css';

class EnterMessageInput extends React.Component {
  render(){
    const messageError = (this.props.message === "") ? <div className="error-message">{this.props.messageErrorMessage}</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Message:</ControlLabel>
        <FormControl maxLength="140" componentClass="textarea" placeholder="Enter message here" onChange={this.props.handleScheduleMessage}/>
        <div className="error-message">{messageError}</div>
      </FormGroup>
    )
  }
}

export default EnterMessageInput;
