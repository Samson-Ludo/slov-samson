import "./App.css";
import { useState, useEffect } from "react";
import {
  Sidebar,
  Navbar,
  Container,
  AppContainer,
  TaskContainer,
  TaskBar,
  TaskForm,
  TaskList,
} from "./components";
import useTasks from "./hooks/useTasks";

const storage = window.localStorage;
const TIME_ZONE = -new Date().getTimezoneOffset() * 60;

function App() {
  // call hooks
  const { allTasks, addNewTask, deleteCurrentTask, updateCurrentTask } =
    useTasks();

  // state
  const assigned_user = storage.getItem("user_id");
  const [task, setTask] = useState({
    assigned_user,
    time_zone: TIME_ZONE,
    is_completed: 0,
    task_date: "",
    task_time: "",
    task_msg: "",
  });
  const [taskId, setTaskId] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const [taskTime, setTaskTime] = useState("")
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openEditTaskForm, setOpenEditTaskForm] = useState(false);

  // togglers
  const toggleEditForm = (currentTaskId, currentTask) => {
    setTaskId(currentTaskId);
    setTask(currentTask);
    setOpenEditTaskForm(true);
  };
  // input handlers
  const handleTaskDate = (event) => {
    event.persist();
    setTask((value) => ({
      ...value,
      task_date: event.target.value,
    }));
  };
  const handleTaskTime = (event) => {
    event.persist();
    let time = event.target.value;
    setTaskTime(time)
   
    const seconds = time.split(':').reduce((acc,time) => (60 * acc) + +time);

    setTask((value) => ({
      ...value,
      task_time: seconds,
    }));
  };
  const handleTaskMsg = (event) => {
    event.persist();
    setTask((value) => ({
      ...value,
      task_msg: event.target.value,
    }));
  };

  // feature functions
  const addTaskFunction = async (e) => {
    e.preventDefault();
    await addNewTask(task);
    setTask({
      assigned_user,
      time_zone: TIME_ZONE,
      is_completed: 0,
      task_date: "",
      task_time: "",
      task_msg: "",
    })
    setOpenTaskForm(false);
  };
  const deleteTaskFunction = async (e) => {
    e.preventDefault();
    let warning = window.confirm("Are you sure you want to delete this task?");
    if (warning === true) {
      await deleteCurrentTask(taskId);
      setTask({
        assigned_user,
        time_zone: TIME_ZONE,
        is_completed: 0,
        task_date: "",
        task_time: "",
        task_msg: "",
      })
      setOpenEditTaskForm(false);
    }
  };
  const updateTaskFunction = async (e) => {
    e.preventDefault();
    await updateCurrentTask(taskId, task);
    setTask({
      assigned_user,
      time_zone: TIME_ZONE,
      is_completed: 0,
      task_date: "",
      task_time: "",
      task_msg: "",
    })
    setOpenEditTaskForm(false);
  };

  useEffect(() => {
    setTaskCount(allTasks.length);
  }, [allTasks]);

  return (
    <AppContainer>
      <Sidebar />
      <Container>
        <Navbar />
        <TaskContainer>
          <TaskBar taskCount={taskCount} setOpenTaskForm={setOpenTaskForm} />
          <TaskForm
            isNew={true}
            openTaskForm={openTaskForm}
            setOpenTaskForm={setOpenTaskForm}
            task={task}
            setTask={setTask}
            taskTime={taskTime}
            handleTaskMsg={handleTaskMsg}
            handleTaskDate={handleTaskDate}
            handleTaskTime={handleTaskTime}
            addTaskFunction={addTaskFunction}
            deleteTaskFunction={deleteTaskFunction}
          />
          <TaskForm
            isNew={false}
            openTaskForm={openEditTaskForm}
            setOpenTaskForm={setOpenEditTaskForm}
            task={task}
            setTask={setTask}
            taskTime={taskTime}
            handleTaskMsg={handleTaskMsg}
            handleTaskDate={handleTaskDate}
            handleTaskTime={handleTaskTime}
            addTaskFunction={updateTaskFunction}
            deleteTaskFunction={deleteTaskFunction}
          />
          <TaskList taskList={allTasks} toggleEditForm={toggleEditForm} />
        </TaskContainer>
      </Container>
    </AppContainer>
  );
}

export default App;
