import { useState, useEffect } from "react";
import axios from "axios";
import {
  useLoginResultsMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../services/tasksApi";

const storage = window.localStorage;
const API_URL = "https://stage.api.sloovi.com";
const LEAD_ID = "lead_465c14d0e99e4972b6b21ffecf3dd691";

function useTasks() {
  const [allTasks, setAllTasks] = useState([]);

  const [loginResults] = useLoginResultsMutation();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const getLoginResultsAndGetTasks = async () => {
    const resp = await loginResults({
      email: "smithwills1989@gmail.com",
      password: "12345678",
    });


    // store necessary results in state and local storage
    const { token, company_id, user_id, name } = await resp.data.results;

    storage.setItem("token", token);
    storage.setItem("company_id", company_id);
    storage.setItem("user_id", user_id);
    storage.setItem("name", name);

    // fectch all tasks
    const tasks = await axios({
      url: `${API_URL}/task/${LEAD_ID}?company_id=${company_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {},
    });

    setAllTasks(tasks.data.results);
  };

  const fetchAllTasks = async () => {
    const company_id = storage.getItem("company_id");
    const token = storage.getItem("token");

    const tasks = await axios({
      url: `${API_URL}/task/${LEAD_ID}?company_id=${company_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {},
    });

    setAllTasks(tasks.data.results);
  };

  const addNewTask = async (task) => {
    try {
      const company_id = storage.getItem("company_id");
      const token = storage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const resp = await addTask({ company_id, headers, task });
      await fetchAllTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurrentTask = async (task_id) => {
    try {
      const company_id = storage.getItem("company_id");
      const token = storage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const resp = await deleteTask({ company_id, headers, task_id });
      await fetchAllTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCurrentTask = async (task_id, task) => {
    try {
      const company_id = storage.getItem("company_id");
      const token = storage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const resp = await updateTask({ company_id, headers, task_id, task });
      await fetchAllTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoginResultsAndGetTasks();
  }, []);
  return { allTasks, addNewTask, deleteCurrentTask, updateCurrentTask };
}

export default useTasks;
