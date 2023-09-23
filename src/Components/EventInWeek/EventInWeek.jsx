import React from "react";
import "./EventInWeek.css";
import { calculateButtonFontColor } from "../AddEvent/AddEvent";

function calculateEventHeight(event) {
  let startTime = new Date(event.startDate);
  let endTime = new Date(event.endDate);

  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;

  console.log(durationInHours);

  return durationInHours * 2;
}

function calculateEventYPos(event) {
  let startTime = new Date(event.startDate);
  return startTime.getHours() / 24;
}

function calculateEventXPos(event) {
  let startTime = new Date(event.startDate);
  return startTime.getDay() / 7;
}

function EventInWeek({ event }) {
  const eventWidth = 1 / 7;

  const style = {
    top: `${calculateEventYPos(event) * 100}%`,
    left: `${calculateEventXPos(event) * 100 + 0.3}%`,
    backgroundColor: event.color,
    height: `${calculateEventHeight(event)}rem`,
    width: `${eventWidth * 100 - 0.6}%`,
    borderRadius: "10%",
  };

  return (
    <div className="single-event" style={style}>
      <p style={{ color: calculateButtonFontColor(event.color) }}>
        {event.title}
      </p>
    </div>
  );
}

export default EventInWeek;
