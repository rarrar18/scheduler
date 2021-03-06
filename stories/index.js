import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";


//Initiates Storybook and registers our Button component
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

//Initiates Storybook and registers our DayListItem component
storiesOf("DayListItem", module) 
  .addParameters({
   // Provides the default background color for our component
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  // To define our stories, we call add() once for each of our test states to generate a story
  .add("Unselected", () =>
  <DayListItem name="Monday" spots={5} />)
  .add("Selected", () =>
  <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () =>
  <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
  // action() lets you make a callback that appears in the actions panel when clicked
  <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> 
));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

//Initiates Storybook and registers our DayList component
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

//Initiates Storybook and registers our InterviewerListItem component
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => action("setInterviewer")(interviewer.id)}
    />
  ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

//Initiates Storybook and registers our InterviewerList component
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      onChange={action("setInterviewer")}
    />
  ));

//Initiates Storybook and registers our Appointment component
storiesOf("Appointment", module)
  //background add-on
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  //render our Appointment component with no props
  .add("Appointment", () => <Appointment />)
  //add a story that renders Appointment component, passes a time prop
  .add("Appointment with Time", () => <Appointment time='12pm' />)
  .add("Header", () => <Header time='12pm' />)
  .add("Empty", () => <Empty onAdd={action('onAdd')} />)
  .add("Show", () => (
    <Show
      student={'Lydia Miller-Jones'}
      interviewer={interviewer}
      onEdit={action('onEdit')}
      onDelete={action('onDelete')}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message={"Delete the appointment?"}
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Status", () => <Status message={'Deleting'} />)
  .add("Error", () => (
    <Error
      message='Could not delete appoinment.'
      onClose={action("onClose")}
    />
  ))
  .add("Edit", () => (
    <Form
      name={'Raph'}
      interviewers={interviewers}
      interviewer={1}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))