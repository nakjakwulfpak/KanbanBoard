export type Status = "pending" | "in progress" | "done";
export type Priority = "low" | "medium" | "high";
export type Task = {
  id: string;
  status: Status;
  title: string;
  points?: number;
  priority: Priority;
};
export const statuses: Array<Status> = ["pending", "in progress", "done"];
export const priorities: Array<Priority> = ["low", "medium", "high"];
export const tasks: Array<Task> = [
  { id: "1", title: "Task 1", status: "pending", points: 5, priority: "low" },
  { id: "2", title: "Task 2", status: "in progress", points: 1, priority: "medium" },
  { id: "3", title: "Task 3", status: "done", points: 3, priority: "high" },
  { id: "4", title: "Task 4", status: "pending", points: 2, priority: "low" },
  { id: "5", title: "Task 5", status: "in progress", points: 5, priority: "medium" },
  { id: "6", title: "Task 6", status: "in progress", points: 8, priority: "high" },
  { id: "7", title: "Task 7", status: "done", points: 3, priority: "low" },
  { id: "8", title: "Task 8", status: "done", points: 8, priority: "low" },
  { id: "9", title: "Task 9", status: "pending", points: 1, priority: "medium" },
];
