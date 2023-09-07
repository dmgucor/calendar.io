import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./NavBar.css";

function NavBar() {
  const monthName = "Sep";
  return (
    <div className="navbar--container">
      <h2>Calendar.io</h2>
      <div className="week-changer--container">
        <BsChevronLeft></BsChevronLeft>
        <p>{monthName}</p>
        <BsChevronRight></BsChevronRight>
      </div>
    </div>
  );
}

export default NavBar;
