
const TIME_ZONE = -new Date().getTimezoneOffset() * 60;


function TaskForm({
  isNew,
  openTaskForm,
  setOpenTaskForm,
  task,
  setTask,
  taskTime,
  handleTaskMsg,
  handleTaskDate,
  handleTaskTime,
  addTaskFunction,
  deleteTaskFunction,
}) {
  const assignedUser = window.localStorage.getItem("name");
  const closeTaskForm = (e) => {
    e.preventDefault();
    setOpenTaskForm(false);
    setTask({
      assigned_user: assignedUser,
      time_zone: TIME_ZONE,
      is_completed: 0,
      task_date: "",
      task_time: "",
      task_msg: "",
    })
  };

  if (openTaskForm) {
    return (
      <form className="taskForm">
        <div className="taskDescription">
          <p className="taskDescription_label">Task Description</p>
          <input
            className="taskDescription_input"
            type="text"
            value={task.task_msg}
            onChange={handleTaskMsg}
          />
        </div>
        <div className="taskDateTime">
          <div className="taskDateTime_date">
            <p>Date</p>
            <input
              className="taskDateTime_dateinput"
              placeholder="Date"
              type="date"
              value={task.task_date}
              onChange={handleTaskDate}
            />
          </div>
          <div className="taskDateTime_time">
            <p>Time</p>
            <input
              className="taskDateTime_timeinput"
              placeholder="Time"
              type="time"
              value={taskTime}
              onChange={handleTaskTime}
            />
          </div>
        </div>
        <div className="assignedUser">
          <p>Assigned User</p>
          <input
            className="assignedUser_input"
            type="text"
            value={assignedUser}
            onChange={() => assignedUser}
          />
        </div>
        <div className="formActions">
          {!isNew && (
            <div title="Delete Task" className="formActions_deletebtn" onClick={deleteTaskFunction}>
              &#128465;
            </div>
          )}
          <button className="formActions_cancelbtn" onClick={closeTaskForm}>
            Cancel
          </button>
          <button
            title={isNew ? "Save Task" : "Update Task"}
            className="formActions_savebtn"
            onClick={addTaskFunction}
          >
            {isNew ? "Save" : "Update"}
          </button>
        </div>
      </form>
    );
  } else return <></>;
}

export default TaskForm;
