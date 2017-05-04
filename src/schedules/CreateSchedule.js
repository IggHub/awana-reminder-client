import React from 'react';
import {Grid, Col, Row, Button, FormControl} from 'react-bootstrap';

class CreateSchedule extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={6} >
            <h1>Create new schedule:</h1>
            <FormControl type="date" onChange={this.props.handleDate} />
            {/*<p>Date: {this.props.date}</p> */}
            <br />
            <Button bsStyle="info" onClick={this.props.postSchedule}>Submit New</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateSchedule;
