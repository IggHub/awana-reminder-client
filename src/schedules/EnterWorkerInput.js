import React from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import Creatable from 'react-select';
import '../Error.css';
import '../Buttons.css';

class EnterWorkerInput extends React.Component{
  render(){
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "" || this.props.selectWorker.length > 70) ? <div className="error-message">{this.props.workerErrorMessage}</div> : <div></div>

    return (
      <div>
        <FormGroup>
          <ControlLabel>Enter Worker:</ControlLabel>
            <Row>
              <Col md={12}>
                <Creatable
                  name="form-field-name"
                  value={this.props.newWorkers[this.props.id - 1]}
                  options={this.props.selectWorkers}
                  onChange={(val, id) => {this.props.handleSelectWorker(val, this.props.id)}}
                />
                </Col>

            </Row>
          {workerNameError}

        </FormGroup>
        <FormGroup>
          <ControlLabel>Enter Phone:</ControlLabel>
          <FormControl maxLength="14" placeholder="Enter phone in format of (123)-456-7890" onChange={(e) => this.props.handleWorkerPhone(this.props.id, e)} />
        </FormGroup>
        <hr />
      </div>
    )
  }
}

export default EnterWorkerInput;
