import React, { useState } from "react";
import "./WeeklyView.css";
import EventInWeek from "../EventInWeek/EventInWeek";
import ModalDeleteEvent from "../ModalDeleteEvent/ModalDeleteEvent";
import { createPortal } from "react-dom";

function WeeklyView({ currentDate, eventsList, setEventsList }) {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const [eventToRemove, setEventToRemove] = useState(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayInMillis = 24 * 60 * 60 * 1000;
  const dateInUse = new Date(currentDate);

  function getFirstDayOfWeek(dateInUse) {
    const currentDay = dateInUse;
    const firstDay = currentDay.getTime() - currentDay.getDay() * dayInMillis;
    const dateRes = new Date(firstDay);
    return dateRes;
  }

  function deleteEvent(currentEvent) {
    const indexInList = eventsList.indexOf(currentEvent);
    if (indexInList > -1) {
      let newEventsList = eventsList;
      newEventsList.splice(indexInList, 1);
      setEventsList(newEventsList);
      setDeleteShowModal(false);
    }
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

  function createTable() {
    const days = 7;
    const hours = 24;

    const rows = [];
    for (let hour = 1; hour <= hours; hour++) {
      const cellsInRow = [];
      for (let day = 1; day <= days; day++) {
        cellsInRow.push(
          <td className="single-cell" key={`${hour}-${day}`}></td>
        );
      }
      rows.push(<tr key={hour}>{cellsInRow}</tr>);
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  function createHourStamps() {
    const hoursInColumn = [];
    for (let hour = 0; hour <= 24; hour++) {
      let formattedHour = "";
      if (hour === 0 || hour === 24) {
        formattedHour = "12 am";
      } else if (hour === 12) {
        formattedHour = "12 pm";
      } else if (hour < 13) {
        formattedHour = `${hour} am`;
      } else {
        formattedHour = `${hour - 12} pm`;
      }

      hoursInColumn.push(<p key={hour}>{formattedHour}</p>);
    }

    return <div id="hour-stamps--container">{hoursInColumn}</div>;
  }

  function showEvents() {
    const firstDayOfWeek = getFirstDayOfWeek(dateInUse);
    firstDayOfWeek.setHours(0);
    firstDayOfWeek.setMinutes(0);

    const eventsInWeek = eventsList.filter((event) => {
      return (
        (new Date(event.startDate).getTime() >= firstDayOfWeek.getTime() &&
          new Date(event.startDate).getTime() <
            firstDayOfWeek.getTime() + 7 * dayInMillis) ||
        (new Date(event.endDate).getTime() > firstDayOfWeek.getTime() &&
          new Date(event.endDate).getTime() <=
            firstDayOfWeek.getTime() + 7 * dayInMillis)
      );
    });

    if (eventsInWeek.length !== 0) {
      const events = eventsInWeek.map((event) => {
        return (
          <EventInWeek
            event={event}
            key={event.startDate}
            currentDate={currentDate}
            setDeleteShowModal={setDeleteShowModal}
            setEventToRemove={setEventToRemove}
          ></EventInWeek>
        );
      });

      return events;
    }
  }

  return (
    <div className="calendar-grid">
      <div className="day-num--container">{createDayNumStamps()}</div>
      <div className="scrollable--container">
        <div id="weekly-grid">
          {createHourStamps()}
          <div className="events--container">
            {createTable()}
            {showEvents()}
            {showDeleteModal &&
              createPortal(
                <ModalDeleteEvent
                  setDeleteShowModal={setDeleteShowModal}
                  eventToRemove={eventToRemove}
                  deleteEvent={deleteEvent}
                ></ModalDeleteEvent>,
                document.getElementById("root")
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyView;
