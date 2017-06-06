import React from 'react';
import {Thumbnail, Row, Col, Button, Image} from 'react-bootstrap';
import CalendarIcon from '../../public/assets/CalendarIcon.png';

const thumbnailStyle= {
  backgroundColor: '#FF8383',
  height: '500px'
};

const topRectangle = {

}

class DisplaySchedules extends React.Component{
  render(){
    return (
      <div>
      {this.props.schedules.map((schedule, index) =>
        <Col md={4} sm={6} key={index}>
          <Thumbnail src={CalendarIcon} style={thumbnailStyle}>
            <Row>
              <Col xs={10} xsOffset={1}>
                <h4 className="class-title">
                  Schedule For: {schedule.date} (Schedule ID: {schedule.id})
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
                <h4>Workers:</h4>
                {this.props.workers.filter(function(worker){
                  return worker.schedule_id === schedule.id
                })
                .map((worker, index) =>
                  <h6 key={index}>{worker.name}</h6>
                )
              }
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
                <h3>Message:</h3>
                  {schedule.message}
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
