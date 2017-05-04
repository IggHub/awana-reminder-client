import React from 'react';
import {Grid, Col, Row, Button, FormControl} from 'react-bootstrap';

class UpdateSchedule extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h1>Edit Schedule for {this.props.date}</h1>
            <FormControl type="date" value={this.props.date} onChange={this.props.handleDate} />
            {/*<p>Date: {this.props.date}</p> */}
            <br />
            <Button bsStyle="info" onClick={this.props.updateSchedule}>Submit Change</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UpdateSchedule;
