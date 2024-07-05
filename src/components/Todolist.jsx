import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const Todolist = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const arr = localStorage.getItem("taskList");
    const obj = JSON.parse(arr);
    obj?.length && setTaskList(obj);
  }, []);

  const deleteTask = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    alert("This Item Would be Deleted");
  };

  const updateListarray = (obj, index) => {
    let tempList = [...taskList];
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskobj) => {
    const updatedTask = { ...taskobj, Completed: false };
    const updatedList = [...taskList, updatedTask];
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    setTaskList(updatedList);
    setModal(false);
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Not Completed", value: "not-completed" },
  ];

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Task
        </button>
        <br/><br />
        <div className="filter-dropdown">
          <label>Filter: </label>
          <select  value= {filter} onChange={(e) => handleFilterChange(e.target.value)}>
            {filterOptions.map((option) => (
              <option key={option.value} value= {option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br/>
      <div className="task-container">
        {taskList &&
          taskList
            .filter((task) => (filter === "completed" ? task.Completed : filter === "not-completed" ? !task.Completed : true))
            .map((obj, index) => (
              <Card key={index} index={index} taskObj={obj} deleteTask={deleteTask} updateListarray={updateListarray} />
            ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default Todolist;