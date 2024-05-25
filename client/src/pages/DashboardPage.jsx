import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Tasklist from "../components/Tasklist";
import AddTaskForm from "../components/AddTaskForm";
import Swal from "sweetalert2";
import EditTaskModal from "../components/EditTaskModal";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const getTasks = async () => {
    try {
      const response = await api.get("/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async (title, description) => {
    try {
      await api.post("/task", { title, description, status: false });
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      if (error?.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error Adding Task",
          text: "Title Already Exists",
        });
      }
    }
  };

  const updateTaskStatus = async (taskId) => {
    try {
      const updatedTasks = tasks.map((currentTask) => {
        return currentTask.id === taskId
          ? { ...currentTask, status: !currentTask.status }
          : currentTask;
      });
      setTasks(updatedTasks);

      await api.patch(`/task/${taskId}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#242424",
      color: "white",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/task/${taskId}`);
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error deleting task:", error);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        background: "#242424",
        color: "white",
      });
    }
  };

  const updateTask = async (taskId, title, description) => {
    try {
      await api.put(`/task/${taskId}`, {
        title,
        description,
      });
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      if (error?.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error Updating Task",
          text: "Title Already Exists",
        });
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-base-300 max-w-lg mx-auto shadow-lg rounded-lg mt-16 select-none">
        <AddTaskForm saveTask={saveTask} />

        <Tasklist
          tasks={tasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          setSelectedTask={setSelectedTask}
        />
      </main>

      <EditTaskModal selectedTask={selectedTask} updateTask={updateTask} />
    </>
  );
}

export default DashboardPage;
