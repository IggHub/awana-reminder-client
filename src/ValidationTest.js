import React from 'react';
import validator from 'validator';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class ValidationTest extends React.Component{
  constructor(){
    super();
    this.state = {
      value: ''
    };
    this.handleValidationState = this.handleValidationState.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.handleDisplayErrorMessage = this.handleDisplayErrorMessage.bind(this);
  };
  handleChange(e){
    this.setState({
      value: e.target.value,
      textMessage: '',
      displayErrorMessage: false,
      errorMessage: ''
    })
  }
  handleValidationState(){
    const length=this.state.value.length;
    if (validator.isLength(this.state.value, {min: 10})) {
      return "success"
    } else if (length > 5) {
      return "warning"
    } else if (length > 0){
      return "error"
    } else {
      return null
    }
  };
  handleDisplayErrorMessage(){
    if (this.state.value.length < 10) {
      this.setState({displayErrorMessage: !this.state.displayErrorMessage, errorMessage: 'Value length is less than 10'})
    }

  }
  checkValidation(){

  }
  render(){
    const displayErrorMessage = this.state.displayErrorMessage ? <div>{this.state.errorMessage}</div> : <div></div>
    return (
      <h1>
        <FormGroup validationState={this.handleValidationState()}>
          <ControlLabel>Validation example</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange.bind(this)}
            ref="value1"
            />
          {displayErrorMessage}
          <Button bsStyle="info" onClick={this.handleDisplayErrorMessage}>Submit</Button>
        </FormGroup>
        {validator.isEmail('igoririanto@rocketmail.com') + ''}
      </h1>
    )
  }
}

export default ValidationTest;
