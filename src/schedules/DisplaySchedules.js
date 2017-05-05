import React from 'react';
import {Thumbnail, Row, Col, Button} from 'react-bootstrap';

class DisplaySchedules extends React.Component{
  render(){
    return (
      <div>
      {this.props.schedules.map((schedule, index) =>
        <Col md={4} sm={6} key={index}>
          <Thumbnail>
            <Row>
              <Col xs={10} xsOffset={1}>
                <h4 className="class-title">
                  Schedule For: {schedule.date} (Schedule ID: {schedule.id})
                </h4>
                Hello

              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
                {this.props.workers.filter(function(worker){
                  return worker.schedule_id === schedule.id
                  })
                  .map((worker, index) => {
                    return <li key={index}>{worker.name}</li>
                  })
                }
                <h6>Worker1</h6>
                <h6>Worker2</h6>
                <h6>Worker3</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
                <Row>
                  <Col xs={4} xsOffset={1}>
                    <Button bsStyle="info" onClick={() => this.props.handleEdit(schedule.id, schedule.date)}>Edit</Button>
                  </Col>
                  <Col xs={4} xsOffset={2}>
                    <Button bsStyle="danger" onClick={() => this.props.deleteSchedule(schedule.id)}>Delete</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Thumbnail>
        </Col>
      )}
      </div>
    )
  }
}

export default DisplaySchedules;
