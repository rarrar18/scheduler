import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  function remove(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => {
       transition(ERROR_DELETE, true)
     });
  };

  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() =>
            transition(CREATE)
          }
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() =>
            back(EMPTY)
          }
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={'Saving'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'Deleting'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Confirm?'}
          onCancel={() =>
            back(EMPTY)
          }
          onConfirm={remove}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={() =>
            back(EMPTY)
          }
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={'Error saving appointment'}
          onClose={() => {back(); back();}}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={'Error deleting appointment'}
          onClose={() => {back();}}
        />
      )}
    </article>
  );
};