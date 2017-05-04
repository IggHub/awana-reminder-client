import React from 'react';
import {Thumbnail, Grid, Row, Col, Button} from 'react-bootstrap';
import Client from '../utils/Client';
import CreateSchedule from './CreateSchedule';
import UpdateSchedule from './UpdateSchedule';

const addButtonStyle={
  position: 'fixed',
  bottom: '25px',
  right: '25px',
  borderRadius: '25px'
};

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
      editable: false,
      creatable: false
    }
    this.handleDate = this.handleDate.bind(this);
    this.postSchedule = this.postSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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
    this.setState({editable: !this.state.editable, date: date, creatable: false})
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
  };
  handleCreate(){
    this.setState({editable: false, creatable: !this.state.creatable})
  };
  componentDidMount(){
    this.getSchedules();
  };

  render(){
    const editSchedule = this.state.editable ? <UpdateSchedule handleDate={this.handleDate} date={this.state.date} updateSchedule={this.updateSchedule} /> : <div></div>
    const createSchedule = this.state.creatable? <CreateSchedule handleDate={this.handleDate} date={this.state.date} postSchedule={this.postSchedule} /> : <div></div>
    return (
      <Grid>
        <Row>
          <h1>Hello from schedulejS!</h1>
          {this.state.schedules.map((schedule, index) =>
            <Col md={4} sm={6} key={index}>
              <Thumbnail>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <h4 className="class-title">
                      Schedule For: {schedule.date} (Schedule ID: {schedule.id})
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <h6>Worker1</h6>
                    <h6>Worker2</h6>
                    <h6>Worker3</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <Row>
                      <Col xs={4} xsOffset={1}>
                        <Button bsStyle="info" onClick={() => this.handleEdit(schedule.id, schedule.date)}>Edit</Button>
                      </Col>
                      <Col xs={4} xsOffset={2}>
                        <Button bsStyle="danger" onClick={() => this.deleteSchedule(schedule.id)}>Delete</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Thumbnail>
            </Col>
          )}
        </Row>
        <Row>
          {editSchedule}
          {createSchedule}
        </Row>
        <Button onClick={this.handleCreate} style={addButtonStyle} className="button-circle" bsStyle="info">+</Button>
      </Grid>
    )
  }
}

export default Schedule;
