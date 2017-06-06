import React from 'react';
import {Thumbnail, Row, Col, Button, Image} from 'react-bootstrap';
import CalendarIcon from '../../public/assets/CalendarIcon.png';
import Moment from 'moment';

const thumbnailStyle= {
  backgroundColor: '#FF8383',
  padding: '100px 0px 100px 0px',
  border: 'none'
};

const topRectangle = {
}

const textStyles = {
  scheduleStyle: {
    textAlign: 'center'
  },
  messageStyle: {
    fontStyle: 'italic'
  }
}

class DisplaySchedules extends React.Component{
  render(){
    return (
      <div>

      {this.props.schedules.map((schedule, index) =>
        <Col md={4} sm={6} key={index}>
          <Thumbnail src={CalendarIcon} style={thumbnailStyle}>
            <Row>
              <Col xs={10} xsOffset={1} style={textStyles.scheduleStyle}>
                <h2 className="class-title">
                  {Moment(schedule.date).format('dddd')}
                </h2>
                <h5>
                  {Moment(schedule.date).format('MMM DD YYYY')}
                </h5>
                <h6>(Schedule ID: {schedule.id})</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
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
                <h5 style={textStyles.messageStyle}>{schedule.message}</h5>
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
