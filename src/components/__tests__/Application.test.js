import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getByPlaceholderText, queryByText, queryByAltText, getByAltText, getAllByTestId, prettyDOM, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  // loads the application data and looks for text that is only available through the API
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    // argument passed is a function that returns a DOM node, in this case, looks for the text "Monday"
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // render the Application, access debug fn returned by render fn
    const { container, debug } = render(<Application />);

    // wait for text "Archie Cohen" to be displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    // references first element in appts array
    const appointment = appointments[0];

    // click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // input "Lydia Miller-Jones" into placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // Check that element with text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until element with text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // Check that the DayListItem with the text "Monday" 
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // also has the text "2 spots remaining".
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    await waitForElement(() => getByDisplayValue(appointment, "Archie Cohen"));

    // const query = queryByText(appointment, "Archie Cohen");
    // console.log("query: ", query);
    // input "Lydia Miller-Jones" into previous text "Archie Cohen"
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // Check that element with text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until element with text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // Check that the DayListItem with the text "Monday" 
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // also has the text "1 spot remaining".
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    // wait for text "Archie Cohen" to be displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    // references first element in appts array
    const appointment = appointments[0];

    // click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // input "Lydia Miller-Jones" into placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // console.log(prettyDOM(appointment));
    // await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    await waitForElement(() => queryByText(appointment, "Error"));

    expect(getByText(appointment, "Error saving appointment")).toBeInTheDocument();
    console.log(prettyDOM(appointment));

  });

  it("shows the delete error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Error"));

    expect(getByText(appointment, "Error deleting appointment")).toBeInTheDocument();
    console.log(prettyDOM(appointment));

  });
});
