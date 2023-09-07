import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import AddEvent from "../AddEvent/AddEvent";
import WeeklyView from "../WeeklyView/WeeklyView";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css";

function MainPage() {
  const [showAddEvent, setShowEvent] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  function handleOnClickAddEvent() {
    setShowEvent(!showAddEvent);
  }

  return (
    <>
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
              <AddEvent closeModal={handleOnClickAddEvent}></AddEvent>,
              document.getElementById("root")
            )}
          <WeeklyView currentDate={currentDate}></WeeklyView>
        </div>
      </div>
    </>
  );
}

export default MainPage;
