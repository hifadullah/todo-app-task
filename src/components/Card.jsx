import React, { useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({ taskObj, index, deleteTask, updateListarray }) => {
  const [modal, setModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(taskObj.Completed ? "completed" : "not-completed");

  const colors = [
    { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
    { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
    { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
    { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
    { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListarray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    updateTask({ ...taskObj, Completed: newStatus === "completed" });
  };

  return (
    <>
      <div className="card-wrapper mr-5">
        <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
        <div className="task-holder">
          <span className="card-header">{taskObj.Name}</span>
          <hr />
          <p>{taskObj.Description}</p>
          <div className="status-dropdown">
            <label>Status: </label>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="completed">Completed</option>
              <option value="not-completed">Not Completed</option>
            </select>
          </div>
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            <button style={{ marginRight: "3px" }} onClick={() => setModal(true)}>
              Edit
            </button>
            <button onClick={handleDelete}>Del</button>
          </div>
        </div>
        <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj}></EditTask>
      </div>
    </>
  );
};

export default Card;