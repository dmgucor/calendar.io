import React from "react";
import { useEffect } from "react";
import "./WeeklyView.css";

function WeeklyView() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    createCells();
    createHourStamps();
  }, []);

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
    console.log(table);
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
      <div className="day-stamps--container">
        {days.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </div>
    </div>
  );
}

export default WeeklyView;
