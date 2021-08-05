import "components/InterviewerListItem.scss";
import React from "react";
const classNames = require('classnames/bind');

export default function InterviewerListItem(props) {
  // id, name, and avatar are the props

  const interviewerClass = classNames(
    "interviewers__item",
    { "interviewers__item--selected": props.selected }
  )

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
