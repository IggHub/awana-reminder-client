import React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import DateTime from 'react-datetime';
import '../Error.css';
import '../DateTime.css';

const yesterday = DateTime.moment().subtract( 1, 'day' );
const valid = function( current ){
    return current.isAfter( yesterday );
};

class EnterDateInput extends React.Component {
  render(){
    const dateError = (this.props.date === "") ? <div className="error-message">{this.props.dateErrorMessage}</div> : <div></div>
    return (
      <FormGroup>
        <ControlLabel>Enter Date:</ControlLabel>
        {/*<DateTime timeFormat={false} isValidDate={valid} onChange={this.props.handleDate}/>*/}
        <DateTime isValidDate={valid} onChange={this.props.handleDate}/>
        <div className="error-message">{dateError}</div>
      </FormGroup>
    )
  }
}

export default EnterDateInput;
