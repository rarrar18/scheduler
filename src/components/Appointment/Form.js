import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // tracks error state when input is invalid
  const [error, setError] = useState("");
  // clears the form values
  const reset = () => {
    setName('');
    setInterviewer(null);
  };
  // call a function and prop when cancel button is clicked
  const cancel = () => {
    reset();
    props.onCancel();
  };
  // checks if input element is empty, shows error if it is
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    // clear the error on successful submission
    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = {name}
            onChange = {event => setName(event.target.value)}
            data-testid="student-name-input"
          />
          
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};