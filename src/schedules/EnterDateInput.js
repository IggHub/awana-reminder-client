import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../Error.css';

class EnterDateInput extends React.Component {
  render(){
    const dateError = (this.props.date === "") ? <div className="error-message">{this.props.dateErrorMessage}</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Date:</ControlLabel>
        <FormControl type="date" onChange={this.props.handleDate} />
        {dateError}
      </FormGroup>
    )
  }
}

export default EnterDateInput;
