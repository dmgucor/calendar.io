import React from "react";

function ModalDeleteEvent({ setDeleteShowModal, deleteEvent, eventToRemove }) {
  return (
    <div>
      <h2>Are you sure?</h2>
      <p>This event will be removed permanently</p>
      <div>
        <input
          type="button"
          value={"Yes"}
          onClick={() => deleteEvent(eventToRemove)}
        ></input>
        <input
          type="button"
          value={"Cancel"}
          onClick={() => setDeleteShowModal(false)}
        ></input>
      </div>
    </div>
  );
}

export default ModalDeleteEvent;
