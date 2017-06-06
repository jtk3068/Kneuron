import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cohorts: [],
      school: {},
    };
  }
  componentDidMount() {
    axios.get(`/api/schools/${localStorage.getItem('id_token')}`)
      .then((data) => {
        this.setState({ user: data.data.user, cohorts: data.data.classes, school: data.data.school[0] });
      })
      .catch((err) => {
        console.log('error finding the schools , ', err);
      });
  }
  render() {
    const { isAuthenticated } = this.props;
    const { fName, lName } = this.state.user;
    const { name } = this.state.school;
    console.log(this.state.user);
    console.log(this.state.school);
    if (isAuthenticated) {
      return (
        <div className="admin-contain">
          <div className="admin-info">
            <div className="badge-info">
              <div className="badge-header" />
              <div className="pic-background" />
              <img alt="profile" src="http://mdepinet.org/wp-content/uploads/person-placeholder.jpg" />
              <h2>Hi {fName} {lName} </h2>
              <hr />
              <div>
                <h4>school admin for </h4>
                <h3 className="text-center school">{ name }</h3>
              </div>
              <button className="ad-logout" type="button">
                Logout
              </button>
            </div>
          </div>
          <div className="performance-info" >
            <div className="performance-holder" />
          </div>
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}

export default AdminDash;
