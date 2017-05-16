import React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import Creatable from 'react-select';
import '../Error.css';

class EnterWorkerInput extends React.Component{
  render(){
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "" || this.props.selectWorker.length > 70) ? <div className="error-message">{this.props.workerErrorMessage}</div> : <div></div>

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
