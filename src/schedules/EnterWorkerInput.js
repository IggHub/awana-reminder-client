import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Creatable from 'react-select';

class EnterWorkerInput extends React.Component{
  render(){
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "") ? <div>{this.props.workerErrorMessage}</div> : <div></div>
    console.log("Worker" + this.props.selectWorker);
    return (
      <FormGroup>
        <ControlLabel>Enter Worker:</ControlLabel>
        <Creatable
          name="form-field-name"
          value={this.props.selectWorker}
          options={this.props.selectWorkers}
          onChange={this.props.handleSelectWorker}
        />
        {workerNameError}
      </FormGroup>
    )
  }
}

export default EnterWorkerInput;
