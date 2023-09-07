import React from "react";
import { useEffect } from "react";
import "./WeeklyView.css";

function WeeklyView({ currentDate }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayInMillis = 24 * 60 * 60 * 1000;
  const dateInUse = new Date(currentDate);

  useEffect(() => {
    createCells();
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

    const table = document.createElement("table");
    for (let hour = 1; hour <= hours; hour++) {
      const row = document.createElement("tr");

      for (let day = 1; day <= days; day++) {
        const cell = document.createElement("td");
        cell.classList.add("single-cell");
        row.appendChild(cell);
      }
      if (table) {
        table.appendChild(row);
      }
    }
    const tableContainer = document.getElementById("weekly-grid");
    tableContainer.replaceChildren(table);
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

  return (
    <div className="calendar-grid">
      <div id="weekly-grid"></div>
      <div id="hour-stamps--container"></div>
      <div className="day-num--container">{createDayNumStamps()}</div>
    </div>
  );
}

export default WeeklyView;
