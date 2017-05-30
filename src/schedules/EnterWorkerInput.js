import React from 'react';
import {FormGroup, FormControl, ControlLabel, Col, Row, Button} from 'react-bootstrap';
import Creatable from 'react-select';
import '../Error.css';
import '../Buttons.css';

class EnterWorkerInput extends React.Component{
  constructor(){
    super();
  }
  render(){
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "" || this.props.selectWorker.length > 70) ? <div className="error-message">{this.props.workerErrorMessage}</div> : <div></div>
  //let workerNameErrorMessage = <div></div>
  //if (this.props.newWorkers[this.props.id - 1] !== undefined) {}
  //const workerNameErrorMessage = this.props.newWorkers[this.props.id - 1] === "") ? <div className="error-message">ERROR!</div> : <div></div>

    const twoButtons = <div><Button onClick={this.props.incrementWorkerHolderCounter} className="add-worker" bsStyle="info">+</Button> <Button onClick={(id) => this.props.decrementWorkerHolderCounter(this.props.id)} className="add-worker" bsStyle="danger">-</Button></div>
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
