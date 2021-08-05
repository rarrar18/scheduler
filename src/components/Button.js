import "components/Button.scss";
import React from "react";
const classNames = require('classnames/bind');


export default function Button(props) {
   // uses the classnames library to create a buttonClass string
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   // button component passes the onClick handler down to button element
   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
 }