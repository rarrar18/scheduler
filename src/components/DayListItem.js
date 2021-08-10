import "components/DayListItem.scss";
import React from "react";
const classNames = require('classnames');

//this component takes in three attributes (name, spots, selected) and one action (setDay) as props
export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
   if (props.spots === 0) {
     return "no spots remaining";
   }
   if (props.spots === 1) {
     return "1 spot remaining";
   }
   if (props.spots > 1) {
     return `${props.spots} spots remaining`;
   }
  }

  // day-list__item component passes the onClick handler down to <li> element
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}