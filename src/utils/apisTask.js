import { data } from "../data";

export const getTask = async () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "");
  console.log(tasks);
  try {
    return [...data, ...tasks];
  } catch (error) {
    console.log(error);
  }
};

export const postNewTask = async (task) => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const arrayToPush = [...tasks];
    arrayToPush.push(task);
    localStorage.setItem("tasks", JSON.stringify(arrayToPush));
    return true;
  } catch (error) {
    console.log(error);
  }
};
