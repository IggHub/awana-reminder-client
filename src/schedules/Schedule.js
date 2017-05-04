import React from 'react';
import {Thumbnail, Grid, Row, Col, Button} from 'react-bootstrap';
import Client from '../utils/Client';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';

class Schedule extends React.Component {
  constructor(){
    super();
    this.state = {
      schedules: [],
      schedule: 'Some schedule',
      date: '',
      userId: 1,
      scheduleId: '',
      prevId: 0,
      editable: false
    }
    this.handleDate = this.handleDate.bind(this);
    this.postSchedule = this.postSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  };
  getSchedules(){
    Client.getSchedules((schedules) => {
      this.setState({schedules})
    })
  };
  postSchedule(){
    Client.postSchedule(this.state.date, (schedule) => {
      this.setState({schedules: this.state.schedules.concat([schedule])})
    })
  };
  updateSchedule(){
    Client.updateSchedule(this.state.scheduleId, this.state.date, () => {
      this.setState({schedules: this.state.schedules});
      this.getSchedules();
    })
  };
  deleteSchedule(schedule){
    Client.deleteSchedule(schedule, () => {
      this.getSchedules();
    })
  };
  handleDate(e){
    this.setState({date: e.target.value})
  };
  handleEdit(id, date){
    this.setState({editable: false, date: date})
    //console.log('editable: ', this.state.editable)
    if (id === this.state.scheduleId){
      this.setState({
        scheduleId: id
      });
    } else if (id !== this.state.scheduleId) {
      this.setState({
        editable: true,
        scheduleId: id
      });
    }
  }
  componentDidMount(){
    this.getSchedules();
  };

  render(){
    const editOrCreateSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} />
    return (
      <Grid>
        <Row>
          <h1>Hello from schedulejS!</h1>
          {this.state.schedules.map((schedule, index) =>
            <Col md={4} sm={6} key={index}>
              <Thumbnail>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    Schedule For: {schedule.date} (Schedule ID: {schedule.id})
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <p>Worker1</p>
                    <p>Worker2</p>
                    <p>Worker3</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <Button bsStyle="info" onClick={() => this.handleEdit(schedule.id, schedule.date)}>Edit</Button> <Button bsStyle="danger" onClick={() => this.deleteSchedule(schedule.id)}>Delete</Button>
                  </Col>
                </Row>
              </Thumbnail>
            </Col>
          )}
        </Row>
        <Row>
          {editOrCreateSchedule}
        </Row>
      </Grid>
    )
  }
}

export default Schedule;
