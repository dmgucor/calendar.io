import React from "react";
import "./EventInWeek.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { calculateButtonFontColor } from "../AddEvent/AddEvent";

function calculateEventHeight(startTime, endTime) {
  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
  return durationInHours / 24;
}

function calculateEventYPos(startTime) {
  const durationInHours = startTime.getHours() + startTime.getMinutes() / 60;
  return (durationInHours / 24) * 100 + durationInHours * 0.02;
}

function calculateEventXPos(startTime) {
  return startTime.getDay() / 7;
}

function handleEventClick(event) {
  console.log(new Date(event.startDate));
  console.log(new Date(event.endDate));
}

function formatHour(date) {
  const hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hour === 0 || hour === 24) {
    return `12:${minutes} am`;
  } else if (hour === 12) {
    return `${hour}:${minutes} pm`;
  } else if (hour < 13) {
    return `${hour}:${minutes} am`;
  } else {
    return `${hour - 12}:${minutes} pm`;
  }
}

function EventInWeek({ event }) {
  const startTime = new Date(event.startDate);
  const endTime = new Date(event.endDate);
  const eventWidth = 1 / 7;

  const createTooltip = () => {
    let style = {};
    if (startTime.getDay() in [0, 1, 2, 3]) {
      style = { left: "100%" };
    } else {
      style = { right: "100%" };
    }

    return (
      <div className="tooltip--container" style={style}>
        <div className="tooltip-content">
          <h3>{event.title ? event.title : "Untitled"}</h3>
          <p>{`${formatHour(startTime)} - ${formatHour(endTime)}`}</p>
          <p>
            {event.description ? event.description : "No description added"}
          </p>

          <div className="actions--container">
            <FiEdit2
              className="action-icon"
              size={"1.2rem"}
              color={"rgb(122, 122, 122)"}
            ></FiEdit2>

            <RiDeleteBin6Line
              className="action-icon"
              size={"1.2rem"}
              color={"rgb(122, 122, 122)"}
            ></RiDeleteBin6Line>
          </div>
        </div>
      </div>
    );
  };

  const style = {
    top: `${calculateEventYPos(startTime)}%`,
    left: `${calculateEventXPos(startTime) * 100 + 0.3}%`,
    backgroundColor: event.color,
    height: `${calculateEventHeight(startTime, endTime) * 100}%`,
    width: `${eventWidth * 100 - 0.6}%`,
    borderRadius: ".3rem",
  };

  return (
    <div
      className="single-event"
      style={style}
      onClick={() => handleEventClick(event)}
    >
      <p style={{ color: calculateButtonFontColor(event.color) }}>
        {event.title}
      </p>
      <span>{createTooltip()}</span>
    </div>
  );
}

export default EventInWeek;
