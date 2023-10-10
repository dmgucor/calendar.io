import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { AddEvent } from "../AddEvent/AddEvent";
import WeeklyView from "../WeeklyView/WeeklyView";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";

function MainPage() {
  const localStorageEventsKey = "calendarEvents";
  const [showAddEvent, setShowEvent] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsList, setEventsList] = useState(fetchEventsFromLocalStorage());

  function fetchEventsFromLocalStorage() {
    const eventsStored = localStorage.getItem(localStorageEventsKey);
    let eventsList;
    if (eventsStored !== null) {
      eventsList = JSON.parse(eventsStored);
    } else {
      eventsList = JSON.parse(JSON.stringify([]));
      localStorage.setItem(localStorageEventsKey, JSON.stringify(eventsList));
    }

    return eventsList;
  }

  function handleOnClickAddEvent() {
    setShowEvent(!showAddEvent);
  }

  function addEventToList(event) {
    console.log(eventsList);
    const copyList = eventsList;

    const newEvent = {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      color: event.color,
    };

    copyList.push(newEvent);
    setEventsList(copyList);
    localStorage.setItem(localStorageEventsKey, JSON.stringify(eventsList));
  }

  return (
    <div className="main-page--container">
      <NavBar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      ></NavBar>
      <div className="main--content--container">
        <div className="left-panel--container">
          <div>
            {" "}
            <button className="add-event-button">
              <IoAddSharp
                className="add-event-icon"
                onClick={() => handleOnClickAddEvent()}
              ></IoAddSharp>
            </button>
          </div>
        </div>
        <div className="right-panel--container">
          {showAddEvent &&
            createPortal(
              <AddEvent
                closeModal={handleOnClickAddEvent}
                addEvent={addEventToList}
                currentDate={currentDate}
              ></AddEvent>,
              document.getElementById("root")
            )}
          <WeeklyView
            currentDate={currentDate}
            eventsList={eventsList}
            setEventsList={setEventsList}
          ></WeeklyView>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
