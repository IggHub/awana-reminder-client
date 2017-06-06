import React from 'react';
import {Thumbnail, Row, Col, Button, Image} from 'react-bootstrap';
import CalendarIcon from '../../public/assets/CalendarIcon.png';
import Moment from 'moment';
import {CloseButton} from 'react-svg-buttons';

const thumbnailStyle= {
  cardStyle: {
    backgroundColor: '#FF8383',
    border: 'none',
    height: '450px'
  },
};

const textStyles = {
  scheduleStyle: {
    color: '#655858',
    textAlign: 'center'
  },
  messageStyle: {
    color: '#655858',
    fontStyle: 'italic'
  },
  listStyle: {
    color: '#655858'
  }
}

class DisplaySchedules extends React.Component{
  render(){
    return (
      <div>

      {this.props.schedules.map((schedule, index) =>
        <Col md={4} sm={6} key={index}>
          <Thumbnail style={thumbnailStyle.cardStyle}>
            <Row>
              <Col sm={1} smOffset={10}>
                <CloseButton size={25} color="#655858" onClick={() => this.props.deleteSchedule(schedule.id)}/>
              </Col>
            </Row>
            <Row>
              <Col sm={4} smOffset={4}>
              <Image src={CalendarIcon} />
              </Col>
            </Row>
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
              <Col xs={10} xsOffset={1} style={thumbnailStyle.listStyle}>
                {this.props.workers.filter(function(worker){
                  return worker.schedule_id === schedule.id
                })
                .map((worker, index) =>
                  <h6 style={textStyles.listStyle} key={index}>{worker.name}</h6>
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
