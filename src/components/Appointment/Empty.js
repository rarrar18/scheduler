import React from "react";

export default function Empty(props){

  

  return (
    // the img should have an onClick handler
    // clicking will trigger the onAdd callback we pass as a prop in our story
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};