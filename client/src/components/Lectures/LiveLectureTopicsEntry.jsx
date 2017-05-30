import React, { Component } from 'react';


class LiveLectureTopicsEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props.topic;
    return (
      <div>
        { name }
      </div>
    );
  }
}

export default LiveLectureTopicsEntry;

