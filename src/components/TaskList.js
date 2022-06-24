import React from "react";

const assignedUserImg =
  "http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png";
const TIME_ZONE = -new Date().getTimezoneOffset() * 60;

function TaskList({ taskList, toggleEditForm }) {
  const assigned_user = window.localStorage.getItem("user_id");

  return (
    <>
      {taskList.map((task, index) => {
        return (
          <div className="taskItem" key={task.id + `${index}`}>
            <img
              className="taskItem_img"
              src={assignedUserImg}
              alt="assigned user"
            />
            <div>
              <p className="taskItem_msg">{task.task_msg}</p>
              <p className="taskItem_date">
                {task.inbox_display_date.replace(/-/g, "/")}
              </p>
            </div>
            <div className="taskItem_actionIcons">
              <button
                title="Edit Task"
                className="taskItem_actionIcons_updateIcon"
                onClick={() =>
                  toggleEditForm(task.id, {
                    assigned_user,
                    time_zone: TIME_ZONE,
                    is_completed: 0,
                    task_date: task.task_date,
                    task_time: task.task_time,
                    task_msg: task.task_msg,
                  })
                }
              >
                <span>&#9998;</span>
              </button>
              <button>
                <span>&#x1F56D;</span>
              </button>
              <button>
                <span>&#10004;</span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TaskList;
