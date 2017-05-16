import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../Error.css';

class EnterPhoneInput extends React.Component{
  render(){
    const phoneError = (this.props.phone === "" || this.props.phone.length > 10) ? <div className="error-message">{this.props.phoneErrorMessage}</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Phone:</ControlLabel>
        <FormControl placeholder="Enter phone in format of (123)-456-7890" onChange={this.props.handleWorkerPhone} />
        <div className="error-message">{phoneError}</div>
      </FormGroup>
    )
  }
}

export default EnterPhoneInput;
