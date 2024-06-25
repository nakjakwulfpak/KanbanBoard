import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import TaskCard from "@/components/TaskCard";
import {
  tasks as initialTasks,
  statuses,
  Task,
  Status,
} from "@/utils/data-task";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });
  const updateTaskPoints = (task: Task, points: number) => {
    const updatedTask = { ...task, points: points };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
  };
  const updateTaskTitle = (task: Task, title: string) => {
    const updatedTask = { ...task, title: title };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
  };
  const updateTaskStatus = (task: Task, status: Status) => {
    const updatedTask = { ...task, status: status };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    const id = e.dataTransfer.getData("id");
    setCurrentlyHoveringOver(null);
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTaskStatus(task, status);
    }
  };
  const [currentlyHoveringOver, setCurrentlyHoveringOver] =
    useState<Status | null>(null);
  const handleDragEnter = (status: Status) => {
    setCurrentlyHoveringOver(status);
    console.log("drag enter", status);
  };
  return (
    <main className="w-screen h-screen overflow-y-scroll">
      <div className="flex items-start justify-start gap-x-20 w-full h-full max-lg:flex-wrap max-lg:justify-center max-lg:gap-y-10 max-lg:items-center">
        {columns.map((column) => (
          <div
            key={column.status}
            onDrop={(e) => handleDrop(e, column.status)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDragEnter(column.status)}
            className=""
          >
            <div className="flex justify-between max-md:justify-start items-start w-full h-full">
              <p className="text-3xl font-bol max-md:ml-0 ml-4 capitalize text-gray-500">
                {column.status}
              </p>
              <p className="text-3xl text-gray-600">
                {column.tasks.reduce(
                  (total, task) => total + (task?.points || 0),
                  0
                )}
              </p>
            </div>
            <div
              className={`${
                currentlyHoveringOver === column.status
                  ? "bg-gray-200 w-full h-full "
                  : ""
              }`}
            >
              {column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  updateTaskPoints={updateTaskPoints}
                  updateTaskTitle={updateTaskTitle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
