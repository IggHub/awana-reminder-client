import React from 'react';
import {FormGroup, ControlLabel, Col, Row, Button} from 'react-bootstrap';
import Creatable from 'react-select';
import '../Error.css';
import '../Buttons.css';

class EnterWorkerInput extends React.Component{
  render(){
    const workerNameError = (this.props.selectWorker === undefined || this.props.selectWorker === "" || this.props.selectWorker.length > 70) ? <div className="error-message">{this.props.workerErrorMessage}</div> : <div></div>
  const twoButtons = <div><Button onClick={this.props.incrementWorkerHolderCounter} className="add-worker" bsStyle="info">+</Button> <Button onClick={(id) => this.props.decrementWorkerHolderCounter(this.props.id)} className="add-worker" bsStyle="danger">-</Button></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Worker:</ControlLabel>
          <Row>
            <Col md={8}>
              <Creatable
                name="form-field-name"
                value={this.props.newWorkers[this.props.id - 1]}
                options={this.props.selectWorkers}
                onChange={(val, id) => {this.props.handleSelectWorker(val, this.props.id)}}
              />
              <Button bsStyle="info" onClick={() => console.log(this.props.id)}>Display ID</Button>
              <Button bsStyle="info" onClick={() => console.log(this.props.selectWorkers[0].label)}>Display workers</Button>
              </Col>
            <Col md={3} mdOffset={1}>
              {twoButtons}
            </Col>
          </Row>
        {workerNameError}
      </FormGroup>
    )
  }
}

export default EnterWorkerInput;
