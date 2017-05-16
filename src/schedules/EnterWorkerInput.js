import React from 'react';
import {FormGroup, ControlLabel, Col, Row, Button} from 'react-bootstrap';
import Creatable from 'react-select';
import '../Error.css';
import '../Buttons.css';

class EnterWorkerInput extends React.Component{
  constructor(){
    super();
    this.state = {
      showAdd: true
    };
    this.toggleButtons = this.toggleButtons.bind(this);
    this.toggleButtonsAndIncrementWorker = this.toggleButtonsAndIncrementWorker.bind(this);
    this.toggleButtonsAndDecrementWorker = this.toggleButtonsAndDecrementWorker.bind(this);
  }
  toggleButtons(){
    this.setState({showAdd: !this.state.showAdd})
  };
  toggleButtonsAndIncrementWorker(){
    this.toggleButtons();
    this.props.incrementWorkerHolderCounter();
  };
  toggleButtonsAndDecrementWorker(){
    this.setState({showAdd: false})
    this.props.decrementWorkerHolderCounter();
  }
  render(){
    const showCorrectButton = this.state.showAdd ? <Button onClick={this.toggleButtonsAndIncrementWorker} className="add-worker" bsStyle="info">+</Button> : <Button onClick={this.toggleButtonsAndDecrementWorker} className="add-worker" bsStyle="danger">-</Button>
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "" || this.props.selectWorker.length > 70) ? <div className="error-message">{this.props.workerErrorMessage}</div> : <div></div>

    return (
      <FormGroup>
        <ControlLabel>Enter Worker:</ControlLabel>
          <Row>
            <Col md={8}>
            <Creatable
              name="form-field-name"
              value={this.props.selectWorker}
              options={this.props.selectWorkers}
              onChange={this.props.handleSelectWorker}
            />
            </Col>
            <Col md={2} mdOffset={1}>
              {showCorrectButton}
            </Col>
          </Row>
        {workerNameError}
      </FormGroup>
    )
  }
}

export default EnterWorkerInput;
