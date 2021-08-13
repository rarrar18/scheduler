export function getAppointmentsForDay(state, givenDay) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.find(day => day.name === givenDay );
  // check if days array has an invalid day
  if (!state.days.length || !selectedDay) {
    return [];
  }
  // for every id in selectedDay.appointments, the id is transformed to be its associated value in state.appointments
  const actualAppointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });
  return actualAppointments;
};

// will return an object that contains interview data if passed an object that contains an interviewer
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  // return a new object containing the interview data when passed an object that contains the interviewer
  const interviewerId = interview.interviewer;

  // transform an interview object with an id representing the interviewer to an object containing a nested object
  const interviewer = state.interviewers[interviewerId];

  return { student: interview.student, interviewer: interviewer};
};

//... returns an array of interviewers for that day
export function getInterviewersForDay(state, givenDay) {
  const found = state.days.find(day => day.name === givenDay );
  // check if days array has an invalid day
  if (!state.days.length  || !found) {
    return [];
  }
  // the id is transformed to be its associated value
  return found.interviewers.map(id => state.interviewers[id]);
};