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
  return (durationInHours / 24) * 100;
}

function calculateEventXPos(startTime) {
  return startTime.getDay() / 7;
}

function isEventUntilNextDay(startTime, endTime) {
  console.log(endTime);
  console.log(startTime);
  if (
    endTime.getDate() > startTime.getDate() &&
    endTime.getMinutes() > 0 &&
    endTime.getHours() !== 12
  ) {
    return true;
  } else {
    return false;
  }
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

function getFirstDayOfWeek(dateInUse) {
  const currentDay = new Date(dateInUse);
  const firstDay =
    currentDay.getTime() - currentDay.getDay() * 24 * 60 * 60 * 1000;
  const dateRes = new Date(firstDay);
  dateRes.setHours(0);
  dateRes.setMinutes(0);
  dateRes.setSeconds(0);
  return dateRes;
}

function EventInWeek({ event, currentDate }) {
  const startTime = new Date(event.startDate);
  const endTime = new Date(event.endDate);

  const firstDayOfWeek = getFirstDayOfWeek(currentDate);
  const eventStartsCurrentWeek =
    new Date(event.startDate).getTime() >= firstDayOfWeek.getTime() &&
    new Date(event.startDate).getTime() <
      firstDayOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000;
  const eventEndsCurrentWeek =
    new Date(event.endDate).getTime() > firstDayOfWeek.getTime() &&
    new Date(event.endDate).getTime() <=
      firstDayOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000;

  function createEventDiv(startDate, endDate) {
    const eventWidth = 1 / 7;

    const style = {
      top: `${calculateEventYPos(startDate)}%`,
      left: `${calculateEventXPos(startDate) * 100 + 0.3}%`,
      backgroundColor: event.color,
      height: `${calculateEventHeight(startDate, endDate) * 99}%`,
      width: `${eventWidth * 100 - 0.6}%`,
      borderRadius: ".3rem",
    };

    return (
      <div
        className="single-event"
        style={style}
        onClick={() => handleEventClick(event)}
      >
        <p style={{ color: calculateButtonFontColor(event.color) }}></p>
        <span>{createTooltip()}</span>
      </div>
    );
  }

  const createTooltip = () => {
    let style = {};
    if (startTime.getDay() in [0, 1, 2, 3] || eventStartsCurrentWeek !== true) {
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

  if (isEventUntilNextDay(startTime, endTime) === true) {
    let firstDay = new Date(endTime);
    firstDay.setHours(0);
    firstDay.setMinutes(0);

    let secondDay = new Date(endTime);
    secondDay.setHours(0);
    secondDay.setMinutes(0);

    const arr = [];
    if (eventStartsCurrentWeek === true) {
      arr.push(createEventDiv(startTime, firstDay));
    }
    if (eventEndsCurrentWeek === true) {
      arr.push(createEventDiv(secondDay, endTime));
    }
    return arr;
  } else {
    return createEventDiv(startTime, endTime);
  }
}

export default EventInWeek;
