import React from "react";
import { useEffect } from "react";
import "./WeeklyView.css";
import EventInWeek from "../EventInWeek/EventInWeek";

function WeeklyView({ currentDate, eventsList }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayInMillis = 24 * 60 * 60 * 1000;
  const dateInUse = new Date(currentDate);

  useEffect(() => {
    createHourStamps();
  }, []);

  function getFirstDayOfWeek(dateInUse) {
    const currentDay = dateInUse;
    const firstDay = currentDay.getTime() - currentDay.getDay() * dayInMillis;
    const dateRes = new Date(firstDay);
    return dateRes;
  }

  function createDayNumStamps() {
    const dayNumberContainer = [];

    let currentDay = getFirstDayOfWeek(dateInUse);
    let today = new Date();
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const addTime = dayIndex === 0 ? 0 : dayInMillis;
      const newDay = new Date(currentDay.getTime() + addTime);

      const isDayToday =
        today.getFullYear() === newDay.getFullYear() &&
        today.getDate() === newDay.getDate() &&
        today.getMonth() === newDay.getMonth();

      const numberStyle = isDayToday
        ? "day-number day-number-today"
        : "day-number";
      dayNumberContainer.push(
        <div className="single-day--container" key={newDay.getDate()}>
          <p className="day-name">{days[dayIndex]}</p>
          <div className={numberStyle}>
            <p>{newDay.getDate()}</p>
          </div>
        </div>
      );
      currentDay = newDay;
    }

    return dayNumberContainer;
  }

  function createCells() {
    const days = 7;
    const hours = 24;

    const rows = [];
    for (let hour = 1; hour <= hours; hour++) {
      const cellsInRow = [];
      for (let day = 1; day <= days; day++) {
        cellsInRow.push(<td className="single-cell"></td>);
      }
      rows.push(<tr>{cellsInRow}</tr>);
    }
    return <table>{rows}</table>;
  }

  function createHourStamps() {
    const hoursContainer = document.getElementById("hour-stamps--container");
    const hoursInColumn = document.createElement("div");
    const startHour = 0;
    for (let hour = startHour; hour <= 24; hour++) {
      let formattedHour = "";
      if (hour === 0) {
        formattedHour = "12 am";
      } else if (hour === 24) {
        formattedHour = "12 am";
      } else if (hour === 12) {
        formattedHour = "12 pm";
      } else if (hour < 13) {
        formattedHour = `${hour} am`;
      } else {
        formattedHour = `${hour - 12} pm`;
      }

      const hourElement = document.createElement("div");
      hourElement.textContent = formattedHour;
      hoursInColumn.appendChild(hourElement);
    }

    hoursInColumn.classList.add("hour-column");
    hoursContainer.replaceChildren(hoursInColumn);
  }

  function showEvents() {
    const firstDayOfWeek = getFirstDayOfWeek(dateInUse);
    firstDayOfWeek.setHours(0);
    firstDayOfWeek.setMinutes(0);

    const eventsInWeek = eventsList.filter((event) => {
      return (
        new Date(event.startDate).getTime() >= firstDayOfWeek.getTime() &&
        new Date(event.endDate).getTime() <=
          firstDayOfWeek.getTime() + 7 * dayInMillis
      );
    });

    if (eventsInWeek.length !== 0) {
      const events = eventsInWeek.map((event) => {
        return <EventInWeek event={event}></EventInWeek>;
      });

      return events;
    }
  }

  return (
    <div className="calendar-grid">
      <div id="weekly-grid">
        {createCells()}
        {showEvents()}
      </div>
      <div id="hour-stamps--container"></div>
      <div className="day-num--container">{createDayNumStamps()}</div>
    </div>
  );
}

export default WeeklyView;
