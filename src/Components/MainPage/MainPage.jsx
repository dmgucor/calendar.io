import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import AddEvent from "../AddEvent/AddEvent";
import WeeklyView from "../WeeklyView/WeeklyView";

function MainPage() {
  const [showAddEvent, setShowEvent] = useState(false);

  function handleOnClickAddEvent() {
    setShowEvent(!showAddEvent);
  }

  return (
    <>
      <button>
        <IoAddSharp onClick={() => handleOnClickAddEvent()}></IoAddSharp>
      </button>
      {showAddEvent &&
        createPortal(
          <AddEvent closeModal={handleOnClickAddEvent}></AddEvent>,
          document.getElementById("root")
        )}
      <WeeklyView></WeeklyView>
    </>
  );
}

export default MainPage;
