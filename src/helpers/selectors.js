//There is often a need to compute new data from existing state in an application. To do this we can use a selector, a function that accepts state as an argument and returns data that is derived from that state.

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
}

//This function will return an object that contains the interview data if it is passed an object that contains an interviewer.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  //The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.
  const interviewerId = interview.interviewer;

  //transform an interview object with an id representing the interviewer to an object containing a nested object
  const interviewer = state.interviewers[interviewerId];

  return { student: interview.student, interviewer: interviewer};
}
/* The above function will output this object:
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/

  //... returns an array of interviewers for that day
export function getInterviewersForDay(state, givenDay) {
  const found = state.days.find(day => day.name === givenDay );
  // check if days array has an invalid day
  if (!state.days.length  || !found) {
    return [];
  }
  // the id is transformed to be its associated value
  return found.interviewers.map(id => state.interviewers[id]);
}