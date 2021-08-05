import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";

import React from "react";

export default function InterviewerList(props) {

  // const interviewerList = props.interviewers.map((interviewer, i) => {
  //   return <InterviewerListItem
  //     avatar={interviewer.avatar}
  //     name={interviewer.name}
  //     setInterviewer={props.setInterviewer}
  //     selected={props.interviewer-1 === i}
  //   >
  //   </InterviewerListItem>
  // })

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer (interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}