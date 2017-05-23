import React from 'react';
import Lecture from "./Lecture";

const LecturesList = props => (
  return(
    <div>
      {props.lectures.map(lecture => {
        <Lecture lecture={lecture}/>
      })}
    </div>
  );
);

export default LecturesList;