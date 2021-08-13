import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // The setDay action can be used to set the current day
  const setDay = function (day) {
    // spread operator replaces the day part within state
    setState({ ...state, day })
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
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });

  }, [])
  // This action makes an HTTP request and updates the local state.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // store the appointment within appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Update the data in the persistent database
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      //Promise does not resolve (should we use return keyword?)
      .then((res) => {
        console.log(res);
        const days = updateSpots(state.day, state.days, appointments);
        // Changing the state refreshes with new values
        setState({ ...state, appointments, days });
        // once api call is completed we return true
        return true;
      })
  };
  // This action makes an HTTP request and updates the local state.
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    // store the appointment within appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Update the data in the persistent database
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        console.log(res);
        const days = updateSpots(state.day, state.days, appointments);
        // Changing the state refreshes with new values
        setState({ ...state, appointments, days });
        // once api call is completed we return true
        return res;
      })
  };

  const updateSpots = function (dayName, days, appointments) {
    // get the day object
    const dayObj = days.find(day => day.name === dayName)

    let spots = 0;
    // for every appt id in the day object's appointments array
    for(const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    // ensure updating an appt does not increase the number of spots
    // update spots in that day --> new day object
    const newDay = {...dayObj, spots};

    // newDays.splice(index, 1, newDay);
    // newDays [index] = newDay;
    
    // put the day back in the array --> new days array
    const newDays = days.map(day => day.name === dayName ? newDay : day);
    return newDays;
  };
  return { state, setDay, bookInterview, cancelInterview }
};