import React from "react";
import { useState } from "react";
import "./AddEvent.css";
import { GiCheckMark } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function AddEvent({ closeModal, addEvent }) {
  const currentTime = new Date();
  let endTime = currentTime;
  endTime = new Date(currentTime.getTime() + 15 * 60 * 1000);

  const colors = ["#ce4760", "#f4b886", "#a8d4ad", "#e2afde", "#006d77"];

  const [currentDateSettings, setCurrentDateSettings] = useState({
    date: currentTime,
    fromHour: currentTime.getHours(),
    fromMinutes: currentTime.getMinutes(),
    toHour: endTime.getHours(),
    toMinutes: endTime.getMinutes(),
  });

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [buttonFontColor, setButtonFontColor] = useState(
    calculateButtonFontColor(selectedColor)
  );

  const [colorInputSelected, setColorInputSelected] = useState(false);

  const formatTime = (isStartTime) => {
    if (isStartTime) {
      let startTimeMinutes = currentDateSettings.fromMinutes;
      let startTimeHours = currentDateSettings.fromHour;
      if (parseInt(startTimeMinutes) < 10) {
        startTimeMinutes = "0" + parseInt(startTimeMinutes);
      }

      if (parseInt(startTimeHours) < 10) {
        startTimeHours = "0" + parseInt(startTimeHours);
      }

      return `${startTimeHours}:${startTimeMinutes}`;
    } else {
      let endTimeMinutes = currentDateSettings.toMinutes;
      let endTimeHours = currentDateSettings.toHour;
      if (parseInt(endTimeMinutes) < 10) {
        endTimeMinutes = "0" + parseInt(endTimeMinutes);
      }

      if (parseInt(endTimeHours) < 10) {
        endTimeHours = "0" + parseInt(endTimeHours);
      }

      return `${endTimeHours}:${endTimeMinutes}`;
    }
  };

  const updateStartTime = (event) => {
    const inputTime = event.target.value.split(":");
    let endTime = new Date();
    endTime.setHours(inputTime[0]);
    endTime.setMinutes(inputTime[1]);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);
    endTime = new Date(endTime.getTime() + 15 * 60 * 1000);
    const newTime = {
      date: currentDateSettings.date,
      fromHour: inputTime[0],
      fromMinutes: inputTime[1],
      toHour: endTime.getHours(),
      toMinutes: endTime.getMinutes(),
    };

    setCurrentDateSettings(newTime);
  };

  const updateEndTime = (event) => {
    const inputTime = event.target.value.split(":");
    const newTime = {
      date: currentDateSettings.date,
      fromHour: currentDateSettings.fromHour,
      fromMinutes: currentDateSettings.fromMinutes,
      toHour: inputTime[0],
      toMinutes: inputTime[1],
    };

    setCurrentDateSettings(newTime);
  };

  const formatDate = () => {
    let month = currentDateSettings.date.getMonth() + 1;
    let day = currentDateSettings.date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${currentDateSettings.date.getFullYear()}-${month}-${day}`;
  };

  const getDuration = () => {
    let startTime = currentDateSettings.date;
    startTime.setHours(currentDateSettings.fromHour);
    startTime.setMinutes(currentDateSettings.fromMinutes);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);

    let endTime = new Date();
    endTime.setHours(currentDateSettings.toHour);
    endTime.setMinutes(currentDateSettings.toMinutes);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);

    let endsNextDay = false;
    if (endTime.getTime() < startTime.getTime()) {
      endTime.setHours(endTime.getHours() + 24);
      endsNextDay = true;
    }
    let durationHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    let durationMinutes = (durationHours * 60) % 60;

    let result = "";

    if (
      parseInt(durationHours) === 0 &&
      parseInt(durationMinutes) === 0 &&
      !submitDisabled
    ) {
      setSubmitDisabled(true);
    }
    if (
      (parseInt(durationHours) !== 0 || parseInt(durationMinutes) !== 0) &&
      submitDisabled
    ) {
      setSubmitDisabled(false);
    }

    if (parseInt(durationHours) > 0) {
      result += `${Math.floor(durationHours)} hr `;
    }
    if (parseInt(durationMinutes) > 0) {
      result += `${Math.floor(durationMinutes)} min`;
    }
    if (endsNextDay) {
      result += " (ends next day)";
    }
    if (result === "") {
      result = "0 min";
    }

    return result;
  };

  function showColors() {
    return (
      <div className="colors--container">
        {colors.map((colorCode) => (
          <div
            key={`${colorCode}`}
            style={{ backgroundColor: colorCode }}
            className="color-select"
            onClick={() => handleOnClickColor(colorCode)}
          >
            {selectedColor === colorCode ? (
              <GiCheckMark color={buttonFontColor}></GiCheckMark>
            ) : (
              ""
            )}
          </div>
        ))}
        <div className="color-input-container">
          {colorInputSelected ? (
            <GiCheckMark
              color={buttonFontColor}
              className="check-color-input"
            ></GiCheckMark>
          ) : (
            ""
          )}
          <input
            className="color-select"
            type="color"
            onChange={(e) => handleInputColorChange(e)}
          ></input>
        </div>
      </div>
    );
  }

  function handleInputColorChange(event) {
    const color = event.target.value;
    handleOnClickColor(color);
    setColorInputSelected(true);
  }

  function handleOnClickColor(color) {
    setSelectedColor(color);
    const fontColor = calculateButtonFontColor(color);
    setButtonFontColor(fontColor);
    setColorInputSelected(false);
  }

  function handleAddEvent(event) {
    const startDate = new Date(event.target.date.value);
    startDate.setDate(startDate.getDate() + 1);
    const startTime = event.target.StartTime.value.split(":");
    startDate.setHours(startTime[0]);
    startDate.setMinutes(startTime[1]);

    const endDate = new Date(startDate);
    const endTime = event.target.EndTime.value.split(":");
    endDate.setHours(endTime[0]);
    endDate.setMinutes(endTime[1]);
    if (endTime < startTime) {
      endDate.setTime(endDate.getTime() + 24 * 60 * 60 * 1000);
    }
    const newEvent = {
      title: event.target.titleName.value,
      startDate: startDate,
      endDate: endDate,
      description: event.target.description.value,
      color: selectedColor,
    };

    addEvent(newEvent);
  }

  return (
    <div className="main--container">
      <div className="add-event--container">
        <IoClose
          className="close-icon"
          size="1.5rem"
          onClick={closeModal}
        ></IoClose>
        <form
          className="add-event-form"
          onSubmit={(e) => {
            handleAddEvent(e);
          }}
        >
          <input
            type="text"
            id="titleName"
            name="titleName"
            className="inputInForm onlyBottomBorder"
            placeholder="Add a title"
            maxLength="40"
          />
          <input
            type="date"
            className="inputInForm onlyBottomBorder calendarInput"
            name="date"
            defaultValue={formatDate()}
          ></input>

          <div className="hours--container">
            <div>
              <label className="inputLabel" htmlFor="StartTime">
                From:
              </label>
              <input
                className="inputInForm onlyBottomBorder"
                type="time"
                name="StartTime"
                id="StartTime"
                value={formatTime(true)}
                onChange={(e) => updateStartTime(e)}
              ></input>
            </div>

            <div>
              <label className="inputLabel" htmlFor="EndTime">
                To:
              </label>
              <input
                className="inputInForm onlyBottomBorder"
                type="time"
                name="EndTime"
                id="EndTime"
                value={formatTime(false)}
                onChange={(e) => updateEndTime(e)}
              ></input>
            </div>
          </div>

          <label className="inputLabel durationLabel">
            Duration: <span>{getDuration()}</span>
          </label>
          <input
            type="text"
            placeholder="Add a description"
            className="inputInForm"
            name="description"
            maxLength={200}
          ></input>
          <div className="color-picker--container">
            <label className="inputLabel">Pick a color</label>
            {showColors()}
          </div>
          <div className="action-button--container">
            <button
              className="action-button submit-button"
              type="submit"
              disabled={submitDisabled}
            >
              Add
            </button>
            <button
              className="action-button cancel-button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function calculateButtonFontColor(color) {
  const red = color.substring(1, 3);
  const green = color.substring(3, 5);
  const blue = color.substring(5);

  if (
    parseInt(red, 16) * 0.299 +
      parseInt(green, 16) * 0.587 +
      parseInt(blue, 16) * 0.114 >
    150
  ) {
    return "#000000";
  } else {
    return "#FFFFFF";
  }
}

export { AddEvent, calculateButtonFontColor };
