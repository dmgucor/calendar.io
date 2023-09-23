import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./NavBar.css";

function NavBar({ currentDate, setCurrentDate }) {
  const weekInMillis = 7 * 24 * 60 * 60 * 1000;
  const dateInUse = new Date(currentDate);

  function getMonthName() {
    const month = dateInUse.getMonth();

    switch (month) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }

  function getNextWeek() {
    const newWeekTime = dateInUse.getTime() + weekInMillis;
    setCurrentDate(newWeekTime);
  }

  function getPreviousWeek() {
    const newWeekTime = dateInUse.getTime() - weekInMillis;
    setCurrentDate(newWeekTime);
  }

  return (
    <div className="navbar--container">
      <h2>Calendar.io</h2>
      <div className="action-buttons--container">
        <input
          type="button"
          value={"Today"}
          className="show-today-button"
          onClick={() => setCurrentDate(new Date())}
        ></input>
        <div className="week-changer--container">
          <BsChevronLeft
            className="change-week-button"
            onClick={() => getPreviousWeek()}
          ></BsChevronLeft>
          <p>{`${getMonthName()} ${dateInUse.getFullYear()}`}</p>
          <BsChevronRight
            className="change-week-button"
            onClick={() => getNextWeek()}
          ></BsChevronRight>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
