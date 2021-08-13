# Interview Scheduler

Always wanted an application where you can keep track of all of your interviews? Introducing Interview Scheduler, a one-stop React app that can swiftly keep organize your upcoming interview bookings.

## Project Overview

View available interview spots and navigate through each day and time slot to book one under your name. You are free to add, edit, and delete appointments.

!["Interview Scheduler"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_show.png?raw=true)

Create new appointments by filling out the student name and selecting an interviewer.

!["Create new appointments"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_edit.png?raw=true)

Save your spot and confirm it with a status message.

!["Save your spot"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_status.png?raw=true)

Not available? You can cancel your appointment, but make sure to confirm first.

!["Confirm appointment cancelling"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_confirmation.png?raw=true)

## Testing Framework

Using a combination of Jest and Cypress, the app has undergone integration and end-to-end testing throughout development.

!["Cypress passed tests"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_cypress.png?raw=true)

Review the user interaction test details by running Cypress on your browser.

!["Cypress test details"](https://github.com/rarrar18/scheduler/blob/master/docs/scheduler_cypress_details.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```