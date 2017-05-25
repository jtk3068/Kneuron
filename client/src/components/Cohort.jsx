import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';
import { allLectures, currentLecture } from '../actions/lectures';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.fetchLectures = this.fetchLectures.bind(this);
  }

  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/cohorts/${localStorage.getItem('id_token')}/${this.props.cohort.id}`);
      if (removed) {
        this.props.history.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchLectures(){
    try {
      console.log('HERE ARE THE LECTURES OF A COHORT: ', this.props.cohort.lectures)
      console.log('this is all lectures inside lecture action', this.props.allLectures(this.props.cohort))
      const resolve = await this.setState({ lectures: []});
      if (resolve) {
        this.props.allLectures(this.props.cohort);
      }
    } catch (e) {
      console.log('Error grabbing lectures: ', e);
    }
  }

  render() {
    console.log(this.props, 'props from line 26 ');
    console.log('IN THE CB FNC: ', this.state.lectures);
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div className="ch-entry-header">{this.props.cohort.subject}</div>
        <h3>{this.props.cohort.time}</h3>
        <button className="lecture-button" onClick={this.fetchLectures}><Link to="/dashboard/lectures">Lectures</Link></button>
        <button onClick={this.deleteClass} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}

export default Cohort;
