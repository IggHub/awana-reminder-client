import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../Error.css';

class EnterPhoneInput extends React.Component{
  render(){
    const phoneError = (this.props.phone === "") ? <div className="error-message">{this.props.phoneErrorMessage}</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Phone:</ControlLabel>
        <FormControl maxLength="14" placeholder="Enter phone in format of (123)-456-7890" onChange={this.props.handleWorkerPhone} />
        <div className="error-message">{phoneError}</div>
      </FormGroup>
    )
  }
}

export default EnterPhoneInput;
