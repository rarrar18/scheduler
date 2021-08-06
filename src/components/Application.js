import "components/Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // spread operator replaces the day part within state
  const setDay = function(day) {
    setState({...state, day})
  };
  // runs once when application loads, and never again
  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      
      // const [days, apppointments, interviewers] = all;
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers }));
    });
    
    // axios.get('/api/days').then(response => {
      //   const days = response.data;
      //   //prev refers the most up to date version of state
      //   setState(prev => ({...prev, days}))
      // });
    }, [])
    
    const appointments = getAppointmentsForDay(state, state.day);

    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
      />
      );
    });
    
    return (
      <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
